import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { HitModule } from './hit/hit.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.prod.env' : '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    AuthModule,
    UserModule,
    LikeModule,
    AdvertisementModule,
    ArticleModule,
    HitModule,
  ],
})
export class AppModule {}
