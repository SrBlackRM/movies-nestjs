import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "./users.model";
import { UsersValidation } from "./validation/users.validation";
var md5 = require('md5');

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserModel) private usersRepository: Repository<UserModel>){}

    // Cria um novo usuário na base de dados, observa-se o uso do <Omit> para omitirmos a senha pro Typscript não considerar erro
    async userAdd(userData: UsersValidation): Promise<Omit<UserModel,'password'>>{
        const userExists = await this.usersRepository.findOne({where: {username: userData.username}});
        const userEmailExists = await this.usersRepository.findOne({where: {email: userData.email}});

        if(userExists){
            throw new ConflictException('Usuário já existe');
        }

        if(userEmailExists){
            throw new ConflictException('Email já existe');
        }

        // Escolhi trabalhar com Hash MD5
        const passwordMD5 = md5(userData.password);

        const user = new UserModel();
        user.email = userData.email;
        user.name = userData.name;
        user.username = userData.username;
        user.password = passwordMD5;

        // Salva no banco os dados passados pelo Request
        const savedUser = await this.usersRepository.save(user);
        
        // Remove a senha depois de salvar no banco para poder retornar sem ela no Response
        const {password, ...noPassUser} = savedUser
        
        return noPassUser
    }


    // Função que vai pesquisar um usuário pelo nome
    async findUserByUsername(username: string): Promise<UserModel>{
        return this.usersRepository.findOne({where: { username }});
    }

    // Função que vai pesquisar um usuário pelo email
    async findUserByEmail(email: string): Promise<UserModel>{
        return this.usersRepository.findOne({where: { email }});
    }
}