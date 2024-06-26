import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @IsPublic()                     // Resolvi deixar privado, pois não faz sentido ter o token antes da autenticação de fato
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest){
        console.log(req.user)
        return this.authService.login(req.user);
    }
}
