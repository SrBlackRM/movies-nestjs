import { Request } from "express";
import { UserModel } from "src/user/users.model";

export interface AuthRequest extends Request {
    user: UserModel;
}