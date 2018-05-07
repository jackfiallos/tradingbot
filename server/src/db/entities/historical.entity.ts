import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Historical extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: Date;

    @Column({type: 'decimal', precision: 6, scale: 2})
    close: number;

    @Column({type: 'decimal', precision: 6, scale: 2})
    high: number;

    @Column({type: 'decimal', precision: 6, scale: 2})
    low: number;

    @Column({type: 'decimal', precision: 6, scale: 2})
    open: number;

    @Column({type: 'decimal', precision: 6, scale: 2})
    volumefrom: number;

    @Column({type: 'decimal', precision: 6, scale: 2})
    volumeto: number;

    @Column()
    datasource: string;
}
