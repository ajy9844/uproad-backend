import { ArticleRepository } from './article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  getArticles() {
    return this.articleRepository.find();
  }
}
