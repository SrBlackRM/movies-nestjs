import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "./users.model";
import { UsersValidation } from "./validation/users.validation";
var md5 = require('md5');

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserModel) private usersRepository: Repository<UserModel>){}

    async userAdd(userData: UsersValidation): Promise<Omit<UserModel,'password'>>{
        const userExists = await this.usersRepository.findOne({where: {username: userData.username}});
        const userEmailExists = await this.usersRepository.findOne({where: {email: userData.email}});

        if(userExists){
            throw new ConflictException('Usuário já existe');
        }

        if(userEmailExists){
            throw new ConflictException('Email já existe');
        }

        const passwordMD5 = md5(userData.password);

        const user = new UserModel();
        user.email = userData.email;
        user.name = userData.name;
        user.username = userData.username;
        user.password = passwordMD5;

        const savedUser = await this.usersRepository.save(user);
        
        const {password, ...noPassUser} = savedUser
        
        return noPassUser
    }

    async loginValidate(userData: UsersValidation): Promise<UserModel>{
        const user = await this.usersRepository.findOne({where: {username: userData.username}});

        if(!user || !(md5(userData.password) == user.password)){
            new UnauthorizedException('Credenciais inválidas')
        } 
        
        return user;
    }

    async findUserByUsername(username: string): Promise<UserModel>{
        return this.usersRepository.findOne({where: { username }});
    }

    
    async findUserByEmail(email: string): Promise<UserModel>{
        return this.usersRepository.findOne({where: { email }});
    }
}