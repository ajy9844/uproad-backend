import { ArticleEntity } from './../article/entity/article.entity';
import { ArticleModule } from './../article/article.module';
import { HitEntity } from './hit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { HitService } from './hit.service';
import { HitController } from './hit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([HitEntity, ArticleEntity]),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
  providers: [HitService],
  controllers: [HitController],
})
export class HitModule {}
