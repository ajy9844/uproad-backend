import { Controller, Param, Post, Req } from '@nestjs/common';
import { HitService } from './hit.service';

@Controller('hit')
export class HitController {
  constructor(private readonly hitService: HitService) {}

  @Post(':articleId')
  hit(@Param('articleId') articleId: number, @Req() request) {
    return this.hitService.hit(articleId, request);
  }
}
