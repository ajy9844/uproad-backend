import { Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { ArticleRepository } from './repository/article.repository';
import { ArticleBlockEntity } from './entity/article-block.entity';
import { ArticleBlockRepository } from './repository/article-block.repository';
import { ArticleKeywordEntity } from './entity/article-keyword.entity';
import { ArticleKeywordRepository } from './repository/article-keyword.repository';
import { KeywordEntity } from './entity/keyword.entity';
import { KeywordRepository } from './repository/keyword.repository';
import { AdvertisementEntity } from '../advertisement/advertisement.entity';
import { AdvertisementRepository } from '../advertisement/advertisement.repository';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { IsNull } from 'typeorm';

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
}
