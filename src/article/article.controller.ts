import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserAuthGuard } from 'src/common/guard/auth.guard';
import { CreateArticleRequestDto } from './dto/create.article.request.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  createArticle(
    @Req() request,
    @Body() createArticleRequestDto: CreateArticleRequestDto,
  ) {
    return this.articleService.createArticle(
      request.user,
      createArticleRequestDto,
    );
  }
}
