import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserModel } from "src/user/users.model";
import { AuthRequest } from "../models/AuthRequest";

export const currentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserModel => {
        const request = context.switchToHttp().getRequest<AuthRequest>();
            return request.user;
    },
);