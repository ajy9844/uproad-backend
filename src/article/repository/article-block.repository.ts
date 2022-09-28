import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleBlockEntity } from '../entity/article-block.entity';

@Injectable()
export class ArticleBlockRepository extends Repository<ArticleBlockEntity> {}
