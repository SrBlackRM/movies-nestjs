import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 340}) 
    title: string;

    @Column({length: 10})       // 10/12/2024
    release: string;

    @Column('int')              // 2024
    releaseAge: number;

    @Column({length: 140})      // Animation, Action, Family, Comedy, Fantasy
    genre: string;

    @Column({length: 40})       
    country: string;

    @Column({length: 5})        // 02:36
    runtime: string;

    @Column('int')
    score: number;

    @Column({length: 1200})     // Movie context and brief description
    overview: string;
}