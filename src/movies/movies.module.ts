import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieModel } from "./movies.model";
import { MovieService } from "./movies.service";

@Module({
    imports: [TypeOrmModule.forFeature([MovieModel])],
    controllers:[MoviesController],
    providers:[MovieService]
})
export class MovieModule{}