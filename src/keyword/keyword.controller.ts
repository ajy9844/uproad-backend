import { Controller, Get } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { Keyword } from './dto/keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  getArticleKeywords(): Promise<Keyword[]> {
    return this.keywordService.getKeywords();
  }
}
