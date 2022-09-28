import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entity/article.entity';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {}
