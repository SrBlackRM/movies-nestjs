import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/user/users.model';
import { UserService } from 'src/user/users.service';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
var md5 = require('md5');

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    async validateUser(email: string, password: string) {
        
        // Vamos fazer uma busca do usuário pelo email, se ele existir
        const user = await this.userService.findUserByEmail(email);

        if (user) {
            // Comparamos a senha convertida em MD5
            const isPasswordValid = (md5(password) == user.password);

            // Se for válida, retorna o objeto Usuário, tirando a senha
            if (isPasswordValid){
                return {
                    ...user,
                    password: undefined,
                };
            }
            
        }
        
        // Caso contrário retorna o seguinte erro
        throw new Error('Email ou senha não corresponde!')
    }

    login(user: UserModel): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            username: user.username
        };
        // Onde criamos nosso token JWT e retornamos após o login ser bem sucedido
        const jwtToken = this.jwtService.sign(payload)

        return {access_token: jwtToken}
    };

}
