import { KeywordEntity } from '../../keyword/keyword.entity';
import { ArticleKeywordEntity } from './../../article/entity/article-keyword.entity';
import { ArticleBlockEntity } from './../../article/entity/article-block.entity';
import { UserEntity } from './../../user/user.entity';
import { AdvertisementEntity } from './../../advertisement/advertisement.entity';
import { LikeEntity } from './../../like/like.entity';
import { HitEntity } from './../../hit/hit.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ArticleEntity } from 'src/article/entity/article.entity';

export const TypeOrmConfig = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    synchronize: false,
    autoLoadEntities: process.env.NODE_ENV !== 'prod',
    logging: process.env.NODE_ENV !== 'prod',
    keepConnectionAlive: true,
    entities: [
      ArticleEntity,
      HitEntity,
      LikeEntity,
      AdvertisementEntity,
      UserEntity,
      ArticleBlockEntity,
      ArticleKeywordEntity,
      KeywordEntity,
    ],
  }),
  inject: [ConfigService],
};
