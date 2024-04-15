import { Body, Controller, Post } from "@nestjs/common";
import { UserModel } from "./users.model";
import { UsersValidation } from "./validation/users.validation";
import { UserService } from "./users.service";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('/users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @IsPublic()  // para criar novos usuários sem necessidade do token, caso queira deixar a classe de criação de usuário privada
                 // só tirar o @IsPublic()
    @Post()
    async createNewUser(@Body() body: UsersValidation): Promise<Omit<UserModel,'password'>>{
        return this.userService.userAdd(body);
    }
}