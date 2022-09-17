import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
export class ArticleBlockEntity {
  @ManyToOne(
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
