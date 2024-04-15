import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from './auth/class/UnauthorizedExeceptionFilter';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    entities: ["dist/**/*.model.js"],
    synchronize: true,
  }), MovieModule, UserModule, AuthModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },{
    provide: APP_FILTER,
    useClass: UnauthorizedExceptionFilter,
  }],
})
export class AppModule {}
