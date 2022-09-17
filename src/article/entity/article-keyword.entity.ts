import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { KeywordEntity } from './keyword.entity';
import { ArticleEntity } from './article.entity';

@Entity()
export class ArticleKeywordEntity {
  @ManyToMany(
    () => KeywordEntity,
    (KeywordEntity) => {
      KeywordEntity.id;
    },
  )
  @JoinTable()
  keyword_id: number;

  @ManyToMany(
    () => ArticleEntity,
    (ArticleEntity) => {
      ArticleEntity.id;
    },
  )
  @JoinTable()
  article_id: number;
}
