import { Controller, UseGuards, Post, Req, Body, Patch, Param, Delete, HttpCode,} from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserAuthGuard } from 'src/common/guard/auth.guard';
import { CreateArticleRequestDto } from './dto/create.article.request.dto';
import { UpdateArticleRequestDto } from './dto/update.article.request.dto';

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

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  updateArticle(
    @Param('id') id: number,
    @Req() request,
    @Body() updateArticleRequestDto: UpdateArticleRequestDto,
  ) {
    return this.articleService.updateArticle(
      id,
      request.user,
      updateArticleRequestDto,
    );
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteArticle(@Param('id') id: number, @Req() request) {
    return this.articleService.deleteArticle(id, request.user);
  }
}
