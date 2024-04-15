import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "../models/UserPayload";
import { UserFromJwt } from "../models/UserFromJwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: UserPayload): Promise<UserFromJwt>{
        return{
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            username: payload.username,
        }
    }
}

// Essa estratégia vai receber o JWT, decodificar de acordo com nosso JWT_SECRETE e validar