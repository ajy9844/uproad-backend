import { UserEntity } from './../../user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ArticleEntity {
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
  description: string;

  @Column()
  difficulty: number;

  @Column()
  is_public: boolean;

  @Column()
  has_ad: boolean;
}
