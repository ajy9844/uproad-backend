import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleKeywordEntity } from '../entity/article-keyword.entity';

@Injectable()
export class ArticleKeywordRepository extends Repository<ArticleKeywordEntity> {}
