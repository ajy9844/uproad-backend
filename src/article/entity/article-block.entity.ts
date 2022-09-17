import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity('article_block')
export class ArticleBlockEntity extends CommonEntity {
  @OneToOne(
    () => ArticleEntity,
    (ArticleEntity) => {
      ArticleEntity.id;
    },
  )
  @JoinColumn()
  article_id: ArticleEntity;

  @Column()
  order: number;

  @Column()
  link: string;

  @Column()
  description: string;
}
