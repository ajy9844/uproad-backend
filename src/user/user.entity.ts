import { CommonEntity } from 'src/common/entity/common.entity';
import { Entity, Column } from 'typeorm';

@Entity('user')
export class UserEntity extends CommonEntity {
  @Column()
  account_address: string;

  @Column()
  nickname: string;

  @Column()
  profile_image: string;

  @Column()
  description: string;
}
