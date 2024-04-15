import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserModel{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column({length: 80})
    name: string;

    @ApiProperty()
    @Column({length: 80})
    username: string;

    @ApiProperty()
    @Column({length: 200})
    email: string;
    
    @ApiProperty()
    @Column({length: 40})
    password: string;
}