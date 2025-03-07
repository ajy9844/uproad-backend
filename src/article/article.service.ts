import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { ArticleRepository } from './repository/article.repository';
import { ArticleBlockEntity } from './entity/article-block.entity';
import { ArticleBlockRepository } from './repository/article-block.repository';
import { ArticleKeywordEntity } from './entity/article-keyword.entity';
import { ArticleKeywordRepository } from './repository/article-keyword.repository';
import { KeywordEntity } from '../keyword/keyword.entity';
import { KeywordRepository } from '../keyword/keyword.repository';
import { AdvertisementEntity } from '../advertisement/advertisement.entity';
import { AdvertisementRepository } from '../advertisement/advertisement.repository';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IsNull, Like } from 'typeorm';
import { parse, parser } from 'html-metadata-parser';
import { Keyword } from '../keyword/dto/keyword.dto';
import { Advertisement, Article, ArticleItem, Block, Link, Writer } from './dto/article-item.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
    @InjectRepository(ArticleBlockEntity)
    private readonly articleBlockRepository: ArticleBlockRepository,
    @InjectRepository(ArticleKeywordEntity)
    private readonly articleKeywordRepository: ArticleKeywordRepository,
    @InjectRepository(KeywordEntity)
    private readonly keywordRepository: KeywordRepository,
    @InjectRepository(AdvertisementEntity)
    private readonly advertisementRepository: AdvertisementRepository,
  ) {}

  async createArticle(user: UserEntity, createArticleDto: CreateArticleDto) {
    const {
      title,
      description,
      keywords,
      level,
      blocks,
      is_public,
      advertisement,
    } = createArticleDto;

    const article = new ArticleEntity();
    article.user = user;
    article.title = title;
    article.description = description;
    article.level = level;
    article.is_public = is_public;
    article.has_ad = advertisement !== null ? true : false;
    await this.articleRepository.save(article);

    for (const block of blocks) {
      const articleBlock = new ArticleBlockEntity();
      articleBlock.article = article;
      articleBlock.order = block.order;
      articleBlock.link = block.link;
      articleBlock.description = block.description;
      await this.articleBlockRepository.save(articleBlock);
    }

    for (const name of keywords) {
      const keyword = await this.keywordRepository.findOne({
        where: { name: name },
      });
      const articleKeyword = new ArticleKeywordEntity();
      articleKeyword.article = article;
      articleKeyword.keyword = keyword;
      await this.articleKeywordRepository.save(articleKeyword);
    }

    if (article.has_ad === true) {
      const articleAdvertisement = new AdvertisementEntity();
      articleAdvertisement.article = article;
      articleAdvertisement.user = user;
      articleAdvertisement.title = advertisement.title;
      articleAdvertisement.link = advertisement.link;
      articleAdvertisement.current_price = advertisement.current_price;
      await this.advertisementRepository.save(articleAdvertisement);
    }

    return { id: article.id };
  }

  async updateArticle(
    id: number,
    user: UserEntity,
    updateArticleDto: UpdateArticleDto,
  ) {
    const { title, description, keywords, level, blocks, is_public } =
      updateArticleDto;

    const article = await this.articleRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (article === null) {
      throw new NotFoundException('삭제되었거나 존재하지 않는 게시물입니다.');
    }
    if (article.user.id !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    article.title = title;
    article.description = description;
    article.level = level;
    article.is_public = is_public;
    await this.articleRepository.update(id, article);

    await this.articleBlockRepository.softDelete({
      article: { id: article.id },
      deleted_at: IsNull(),
    });

    for (const block of blocks) {
      const articleBlock = new ArticleBlockEntity();
      articleBlock.article = article;
      articleBlock.order = block.order;
      articleBlock.link = block.link;
      articleBlock.description = block.description;
      await this.articleBlockRepository.save(articleBlock);
    }

    await this.articleKeywordRepository.softDelete({
      article: { id: article.id },
      deleted_at: IsNull(),
    });

    for (const name of keywords) {
      const keyword = await this.keywordRepository.findOne({
        where: { name: name },
      });
      const articleKeyword = new ArticleKeywordEntity();
      articleKeyword.article = article;
      articleKeyword.keyword = keyword;
      await this.articleKeywordRepository.save(articleKeyword);
    }

    return { id: article.id };
  }

  //TODO: 캐스케이드 사용해서 연관 엔티티 삭제
  async deleteArticle(id: number, user: UserEntity) {
    const article = await this.articleRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (article === null) {
      throw new NotFoundException('삭제되었거나 존재하지 않는 게시물입니다.');
    }
    if (article.user.id !== user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.articleBlockRepository.softDelete({
      article: { id: article.id },
      deleted_at: IsNull(),
    });

    await this.articleKeywordRepository.softDelete({
      article: { id: article.id },
      deleted_at: IsNull(),
    });

    await this.articleRepository.softDelete({
      id: article.id,
    });
  }

  async getArticles(
    limit: number,
    page: number,
    sort: string,
    query: string,
  ): Promise<ArticleItem[]> {
    const articleItems: ArticleItem[] = [];

    if (sort === 'latest' || sort === 'trending') {
      const articles = await this.articleRepository.find({
        relations: ['user'],
        where: [
          { title: Like('%' + query + '%') },
          { description: Like('%' + query + '%') },
        ],
        order: {
          created_at: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
        cache: true,
      });

      for (const article of articles) {
        const articleItem = new ArticleItem();
        // article
        articleItem.id = article.id;
        articleItem.title = article.title;
        articleItem.description = article.description;
        articleItem.level = article.level;
        articleItem.created_at = article.created_at.toISOString();
        articleItem.updated_at = article.updated_at.toISOString();

        // keywords
        const articleKeywords = await this.articleKeywordRepository.find({
          where: { article: { id: article.id } },
          relations: ['keyword'],
        });

        const keywords: Keyword[] = [];
        for (const articleKeyword of articleKeywords) {
          const keyword = new Keyword();
          keyword.id = articleKeyword.keyword.id;
          keyword.name = articleKeyword.keyword.name;
          keywords.push(keyword);
        }
        articleItem.keywords = keywords;

        // writer
        articleItem.writer = new Writer();
        articleItem.writer.nickname = article.user.nickname;
        articleItem.writer.profile_image = article.user.profile_image;

        // hit, like
        articleItem.hit = 10;
        articleItem.like = 10;

        articleItems.push(articleItem);
      }
    //} else if (sort === 'trending') {
    //  //TODO
    } else {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return articleItems;
  }

  async getArticle(id: number): Promise<ArticleItem> {
    const article = await this.articleRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (article === null) {
      throw new NotFoundException('삭제되었거나 존재하지 않은 게시물입니다.');
    }
    if (article.is_public === false) {
      throw new ConflictException('공개되지 않은 게시물입니다.');
    }

    const articleKeywords = await this.articleKeywordRepository.find({
      where: { article: { id: article.id } },
      relations: ['keyword'],
    });

    const articleBlocks = await this.articleBlockRepository.find({
      where: { article: { id: article.id } },
      order: {
        order: 'ASC',
      },
    });

    const articleAdvertisement = await this.advertisementRepository.findOne({
      where: { article: { id: article.id } },
    });

    //FIXME: circular reference 문제 해결
    /*
    const hitCount = await this.hitRepository.findAndCount({
      where: { article: { id: id } },
    });

    const likeCount = await this.likeRepository.findAndCount({
      where: { article: { id: id } },
    });
     */

    const articles = await this.articleRepository.find({
      where: { user: { id: article.user.id } },
      order: {
        id: 'ASC',
      },
    });

    const curArticleIdx = articles.findIndex((x) => x.id === article.id);
    const prevArticleIdx = curArticleIdx - 1;
    const nextArticleIdx =
      curArticleIdx + 1 === articles.length ? -1 : curArticleIdx + 1;

    // article
    const articleItem = new ArticleItem();
    articleItem.id = article.id;
    articleItem.title = article.title;
    articleItem.description = article.description;
    articleItem.level = article.level;
    articleItem.created_at = article.created_at.toISOString();
    articleItem.updated_at = article.updated_at.toISOString();

    // keywords
    const keywords: Keyword[] = [];
    for (const articleKeyword of articleKeywords) {
      const keyword = new Keyword();
      keyword.id = articleKeyword.keyword.id;
      keyword.name = articleKeyword.keyword.name;
      keywords.push(keyword);
    }
    articleItem.keywords = keywords;

    // blocks
    const blocks: Block[] = [];
    for (const articleBlock of articleBlocks) {
      const block = new Block();
      block.id = articleBlock.id;
      block.order = articleBlock.order;
      block.description = articleBlock.description;

      // html-metadata-parser
      block.link = new Link();
      await parser(articleBlock.link).then((result) => {
        block.link.site_name =
          result.og.site_name !== undefined ? result.og.site_name : null;
        block.link.url =
          result.og.url !== undefined ? result.og.url : articleBlock.link;
        block.link.title =
          result.og.title !== undefined ? result.og.title : null;
        block.link.image =
          result.og.image !== undefined ? result.og.image : null;
        block.link.description =
          result.og.description !== undefined ? result.og.description : null;
        block.link.type = result.og.type !== undefined ? result.og.type : null;
      });
      blocks.push(block);
    }
    articleItem.blocks = blocks;

    // advertisement
    let advertisement = null;
    if (articleAdvertisement !== null) {
      advertisement = new Advertisement();
      advertisement.id = articleAdvertisement.id;
      advertisement.link = articleAdvertisement.link;
      advertisement.current_price = articleAdvertisement.current_price;
    }
    articleItem.advertisement = advertisement;

    // writer
    const writer = new Writer();
    writer.nickname = article.user.nickname;
    writer.profile_image = article.user.profile_image;
    articleItem.writer = writer;

    // hit, like (default)
    articleItem.hit = 10;
    articleItem.like = 10;

    // previous article
    let prevArticle = null;
    if (prevArticleIdx !== -1) {
      prevArticle = new Article();
      prevArticle.id = articles[prevArticleIdx].id;
      prevArticle.title = articles[prevArticleIdx].title;
    }
    articleItem.prev_article = prevArticle;

    // next article
    let nextArticle = null;
    if (nextArticleIdx !== -1) {
      nextArticle = new Article();
      nextArticle.id = articles[nextArticleIdx].id;
      nextArticle.title = articles[nextArticleIdx].title;
    }
    articleItem.next_article = nextArticle;

    return articleItem;
  }
}
