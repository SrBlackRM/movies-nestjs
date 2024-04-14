import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/users.service';
var md5 = require('md5');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    
    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);

        if (user) {
            const isPasswordValid = (md5(password) == user.password);

            if (isPasswordValid){
                return {
                    ...user,
                    password: undefined,
                };
            }
            
        }

        throw new Error('Email ou senha não corresponde!')
    }
}
