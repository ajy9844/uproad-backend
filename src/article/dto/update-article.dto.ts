import { Block } from './create-article.dto';

export class UpdateArticleDto {
  title: string;
  description: string;
  keywords: [string];
  level: number;
  blocks: Block[];
  is_public: boolean;
}
