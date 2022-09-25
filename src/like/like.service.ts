import { ArticleRepository } from './../article/article.repository';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { LikeEntity } from './like.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: LikeRepository,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async like(articleId: number, user: UserEntity) {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    const isLike = await this.likeRepository.findOne({
      relations: { user: true, article: true },
      where: { user, article },
    });

    if (isLike) {
      return;
    }

    const likeEntity = new LikeEntity();
    likeEntity.user = user;
    likeEntity.article = article;

    await this.likeRepository.save(likeEntity);
  }

  async unLike(articleId: number, user: UserEntity) {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    const isLike = await this.likeRepository.findOne({
      where: { user, article },
      relations: { user: true, article: true },
    });

    if (!isLike) {
      return;
    }

    const likeEntity = new LikeEntity();
    likeEntity.user = user;
    likeEntity.article = article;

    await this.likeRepository.delete(likeEntity);
  }
}
