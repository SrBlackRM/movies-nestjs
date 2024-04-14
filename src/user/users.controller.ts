import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserModel } from "./users.model";
import { UsersValidation } from "./validation/users.validation";
import { UserService } from "./users.service";

@Controller('/users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    async createNewUser(@Body() body: UsersValidation): Promise<Omit<UserModel,'password'>>{
        return this.userService.userAdd(body);
    }
}