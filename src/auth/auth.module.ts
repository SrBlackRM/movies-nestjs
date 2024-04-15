import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/users.module';
import { MovieModule } from 'src/movies/movies.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stretegies/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, MovieModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
