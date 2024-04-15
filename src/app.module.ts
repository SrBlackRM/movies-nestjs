import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
require('dotenv').config();

@Module({
  // passamos nosso objeto de configuração no forRoot
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB_NAME),
    entities: ["dist/**/*.model.js"],
    synchronize: true,
  }), MovieModule, UserModule, AuthModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
})
export class AppModule {}
