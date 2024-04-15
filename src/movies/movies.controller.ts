import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from "@nestjs/common";
import { MovieModel } from "./movies.model";
import { MovieService } from "./movies.service";
import { MovieValidation } from "./validation/movies.validation";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('/movies')
export class MoviesController{
    constructor(private readonly movieService: MovieService) {}

    @IsPublic()                 // para visualizar catálogo sem necessidade de estar autenticado
                                // para deixar privado, basta tirar o @IsPublic()
    @Get()
    public async getAll(): Promise<MovieModel[]>{
        return this.movieService.getAllMovies();
    }

    @IsPublic()
    @Get(':id')
    public async getSpecificMovies(@Param('id', ParseIntPipe) id: number): Promise<MovieModel>{
        return this.movieService.getOneMovie(id);
    }

    @Post('add')
    public createNewMovie(@Body() movieDataBody: MovieValidation): object{
        return this.movieService.movieAdd(movieDataBody);
    }
    

    @Put(':id/update')
    updateMovie(@Param('id', ParseIntPipe) id: number, @Body() movieDataBody: MovieModel) {
        return this.movieService.movieUpdate(id, movieDataBody);
    }


    @Delete(':id/delete')
    deleteMovie(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.movieDelete(id);
    }

}