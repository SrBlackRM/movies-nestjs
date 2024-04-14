import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 80})
    name: string;

    @Column({length: 80})
    username: string;

    @Column({length: 200})
    email: string;
    
    @Column({length: 40})
    password: string;
}