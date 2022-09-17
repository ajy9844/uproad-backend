import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class ArticleEntity {
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
