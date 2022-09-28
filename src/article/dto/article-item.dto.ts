import { Keyword } from '../../keyword/dto/keyword.dto';

export class ArticleItem {
  id: number;
  title: string;
  description: string;
  keywords: Keyword[];
  level: number;
  blocks: Block[];
  advertisement: Advertisement;
  writer: Writer;
  hit: number;
  like: number;
  prev_article: Article;
  next_article: Article;
  created_at: string;
  updated_at: string;
}

export class Block {
  id: number;
  order: number;
  link: Link;
  description: string;
}

export class Link {
  site_name: string;
  url: string;
  title: string;
  image: string;
  description: string;
  type: string;
}

export class Advertisement {
  id: number;
  link: string;
  current_price: number;
}

export class Writer {
  nickname: string;
  profile_image: string;
}

export class Article {
  id: number;
  title: string;
}
