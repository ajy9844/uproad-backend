export class CreateArticleDto {
  title: string;
  description: string;
  keywords: [string];
  level: number;
  blocks: Block[];
  is_public: boolean;
  advertisement: Advertisement;
}

export class Block {
  order: number;
  link: string;
  description: string;
}

export class Advertisement {
  title: string;
  link: string;
  current_price: number;
}
