import { CommonEntity } from 'src/common/entity/common.entity';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('like')
export class LikeEntity extends CommonEntity {
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
}
