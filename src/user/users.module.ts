import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./users.model";
import { UserController } from "./users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService],
})
export class UserModule{}