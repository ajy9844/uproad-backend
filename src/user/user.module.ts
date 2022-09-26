import { AdvertisementEntity } from './../advertisement/advertisement.entity';
import { LikeEntity } from './../like/like.entity';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { AuthModule } from './../auth/auth.module';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ArticleEntity, AdvertisementEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
