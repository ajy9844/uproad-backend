import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('keyword')
export class KeywordEntity extends CommonEntity {
  @Column()
  name: string;
}
