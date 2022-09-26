import { Block } from './create.article.request.dto';

export class UpdateArticleRequestDto {
  title: string;
  description: string;
  keywords: [string];
  level: number;
  blocks: Block[];
  is_public: boolean;
}
