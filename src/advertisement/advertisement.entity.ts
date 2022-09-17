import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class AdvertisementEntity {
    // @ManyToOne(() => )

    @Column()
    title: string;

    @Column()
    current_price: number;

    @Column()
    link: string;
}
