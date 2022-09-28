import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordEntity } from './keyword.entity';
import { KeywordRepository } from './keyword.repository';
import { Keyword } from './dto/keyword.dto';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordEntity)
    private readonly keywordRepository: KeywordRepository,
  ) {}

  async getKeywords(): Promise<Keyword[]> {
    const keywords: Keyword[] = [];
    const items = await this.keywordRepository.find({});

    for (const item of items) {
      const keyword = new Keyword();
      keyword.id = item.id;
      keyword.name = item.name;
      keywords.push(keyword);
    }

    return keywords;
  }
}
