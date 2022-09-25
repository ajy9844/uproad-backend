import { LikeService } from './like.service';
import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserAuthGuard } from 'src/common/guard/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(UserAuthGuard)
  @Post(':articleId')
  like(@Param('articleId') articleId: number, @Req() request) {
    return this.likeService.like(articleId, request.user);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':articleId')
  unLike(@Param('articleId') articleId: number, @Req() request) {
    return this.likeService.unLike(articleId, request.user);
  }
}
