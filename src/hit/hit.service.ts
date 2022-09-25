import { ArticleRepository } from './../article/article.repository';
import { ArticleEntity } from './../article/entity/article.entity';
import { HitEntity } from './hit.entity';
import { HitRepository } from './hit.repository';
import { UserService } from './../user/user.service';
import { JWTService } from 'src/common/jwt/jwt.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HitService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
    @InjectRepository(HitEntity)
    private readonly hitRepository: HitRepository,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async hit(articleId: number, request) {
    const { authorization } = request?.headers;

    if (!authorization) {
      return;
    }

    const token = await this.jwtService.splitAuthorization(authorization);
    const payload = await this.jwtService.verify(token);
    const user = await this.userService.findOne(payload.sub);

    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    const hitEntity = new HitEntity();
    hitEntity.user = user;
    hitEntity.article = article;

    // const hit = await this.hitRepository.findOne({
    //   where: { user: user, article: article },
    // });

    await this.hitRepository.save(hitEntity);
  }
}
