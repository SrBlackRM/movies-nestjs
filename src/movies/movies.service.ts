import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieModel } from "./movies.model";
import { Repository } from "typeorm";
import { MovieValidation } from "./validation/movies.validation";


@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieModel) private moviesRepository: Repository<MovieModel>) {}


    // PEGAR TODOS OS FILMES, RETORNA UMA LISTA
    async getAllMovies(): Promise<MovieModel[]>{
        return await this.moviesRepository.find();
    }

    // PEGAR APENAS UM FILME PELO ID
    async getOneMovie(id: number): Promise<MovieModel> {
        const movie = await this.moviesRepository.findOne( {where: {id}} );
        if (!movie) {
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `)
        }
        return movie
    } 

    // ADICIONA O FILME NO BANCO, CASO ESTEJA TUDO CERTO (VALIDADO)
    async movieAdd(movieDataBody: MovieValidation): Promise<MovieModel>{
        return await this.moviesRepository.save(movieDataBody);
    }

    // ATUALIZA UM FILME BASEADO NO SEU ID
    async movieUpdate(
        id: number, 
        body: MovieValidation)
        : Promise<MovieModel> {
        const movie = await this.moviesRepository.findOne({ where: {id} });

        if (!movie) {
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `)
        }

        await this.moviesRepository.update({id}, body)

        return await this.moviesRepository.findOne({ where: {id} } );
    }

    // DELETA UM FILME
    async movieDelete(id: number): Promise<string>{
        const movie = await this.moviesRepository.findOne({ where: {id} });

        if (!movie) {
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `)
        }

        await this.moviesRepository.delete(id);

        return `O filme com o id ${id} foi deletado com sucesso!`
    }
}