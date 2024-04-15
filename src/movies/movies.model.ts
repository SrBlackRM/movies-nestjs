import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class MovieModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({length: 340}) 
    title: string;

    @ApiProperty()
    @Column({length: 10})       // 10/12/2024
    release: string;

    @ApiProperty()
    @Column('int')              // 2024
    releaseAge: number;

    @ApiProperty()
    @Column({length: 140})      // Animation, Action, Family, Comedy, Fantasy
    genre: string;

    @ApiProperty()
    @Column({length: 40})       
    country: string;

    @ApiProperty()
    @Column({length: 5})        // 02:36
    runtime: string;

    @ApiProperty()
    @Column('int')
    score: number;

    @ApiProperty()
    @Column({length: 1200})     // Movie context and brief description
    overview: string;
}