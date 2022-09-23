import { ArticleRepository } from './article.repository';
import { ArticleEntity } from './entity/article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleRepository],
})
export class ArticleModule {}
