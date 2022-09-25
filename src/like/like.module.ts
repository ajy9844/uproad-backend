import { ArticleEntity } from 'src/article/entity/article.entity';
import { LikeEntity } from './like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, ArticleEntity])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
