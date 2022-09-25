import { CommonEntity } from 'src/common/entity/common.entity';
import { UserEntity } from './../../user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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
