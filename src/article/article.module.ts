import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { ArticleBlockEntity } from './entity/article-block.entity';
import { ArticleKeywordEntity } from './entity/article-keyword.entity';
import { KeywordEntity } from '../keyword/keyword.entity';
import { AdvertisementEntity } from '../advertisement/advertisement.entity';
import { AdvertisementModule } from '../advertisement/advertisement.module';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { AdvertisementRepository } from '../advertisement/advertisement.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      ArticleBlockEntity,
      ArticleKeywordEntity,
      KeywordEntity,
      AdvertisementEntity,
    ]),
    AdvertisementModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, AdvertisementRepository],
})
export class ArticleModule {}
