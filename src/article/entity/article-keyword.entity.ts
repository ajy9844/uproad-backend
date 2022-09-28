import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { KeywordEntity } from '../../keyword/keyword.entity';
import { ArticleEntity } from './article.entity';

@Entity('article_keyword')
export class ArticleKeywordEntity extends CommonEntity {
  @ManyToOne(() => ArticleEntity)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ManyToOne(() => KeywordEntity)
  @JoinColumn({ name: 'keyword_id' })
  keyword: KeywordEntity;
}
