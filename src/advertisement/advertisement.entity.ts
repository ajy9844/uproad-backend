import { ArticleEntity } from 'src/article/entity/article.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class AdvertisementEntity {
  @ManyToOne(
    () => ArticleEntity,
    (ArticleEntity) => {
      ArticleEntity.id;
    },
  )
  @JoinColumn()
  article_id: ArticleEntity;

  @ManyToOne(
    () => UserEntity,
    (UserEntity) => {
      UserEntity.id;
    },
  )
  @JoinColumn()
  user_id: UserEntity;

  @Column()
  title: string;

  @Column()
  current_price: number;

  @Column()
  link: string;
}
