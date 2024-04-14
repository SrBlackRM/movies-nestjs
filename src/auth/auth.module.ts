import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/users.module';
import { MovieModule } from 'src/movies/movies.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stretegies/local.strategy';

@Module({
  imports: [UserModule, MovieModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
