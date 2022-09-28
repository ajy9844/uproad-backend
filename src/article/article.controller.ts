import { Controller, UseGuards, Post, Req, Body, Patch, Param, Delete, HttpCode, Get, Query, } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserAuthGuard } from 'src/common/guard/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleItem } from './dto/article-item.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  createArticle(@Req() request, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(request.user, createArticleDto);
  }

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  updateArticle(
    @Param('id') id: number,
    @Req() request,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.updateArticle(
      id,
      request.user,
      updateArticleDto,
    );
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteArticle(@Param('id') id: number, @Req() request) {
    return this.articleService.deleteArticle(id, request.user);
  }

  @Get(':id')
  getArticle(@Param('id') id: number): Promise<ArticleItem> {
    return this.articleService.getArticle(id);
  }
}
