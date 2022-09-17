import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { KeywordEntity } from './keyword.entity';
import { ArticleEntity } from './article.entity';

@Entity('article_keyword')
export class ArticleKeywordEntity extends CommonEntity {
  @ManyToOne(
    () => KeywordEntity,
    (KeywordEntity) => {
      KeywordEntity.id;
    },
  )
  @JoinTable()
  keyword_id: KeywordEntity;

  @ManyToOne(
    () => ArticleEntity,
    (ArticleEntity) => {
      ArticleEntity.id;
    },
  )
  @JoinTable()
  article_id: ArticleEntity;
}
