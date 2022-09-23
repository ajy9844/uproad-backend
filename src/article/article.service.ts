import { ArticleEntity } from './entity/article.entity';
import { ArticleRepository } from './article.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}
  getArticles() {
    return this.articleRepository.find();
  }
}
