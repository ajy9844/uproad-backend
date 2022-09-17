import { Column, Entity } from 'typeorm';

@Entity()
export class KeywordEntity {
  @Column()
  name: string;
}
