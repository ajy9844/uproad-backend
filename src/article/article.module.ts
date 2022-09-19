import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
