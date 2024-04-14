import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieModel } from "./movies.model";
import { Repository } from "typeorm";
import { MovieValidation } from "./validation/movies.validation";
import redis from "src/cache/redis.service";


@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieModel) private moviesRepository: Repository<MovieModel>) {}

    // PEGAR TODOS OS FILMES, RETORNA UMA LISTA
    async getAllMovies(): Promise<MovieModel[]>{
        // Definimos nossa key para buscar os filmes em cache
        const cacheKey = "all:movies";
       
        // Buscamos no Redis pela key all:movies, que será nosso cache
        const cachedMovies = await redis.get(cacheKey);

        // Se existir uma lista em cache, retornamos
        if(cachedMovies){
            return JSON.parse(cachedMovies);
        }

        // Caso contrário, buscamos no banco de dados
        const movies = await this.moviesRepository.find();

        // E por fim, colocamos em cache com nossa key definida anteriormente
        await redis.set(cacheKey, JSON.stringify(movies));

        return movies;
    }

    // PEGAR APENAS UM FILME PELO ID
    async getOneMovie(id: number): Promise<MovieModel> {
        const movie = await this.moviesRepository.findOne( {where: {id}} );
        if (!movie) {
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `);
        }
        return movie;
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
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `);
        }

        // Atualiza os campos do filme com os valores fornecidos no corpo da requisição
        Object.assign(movie,body);

        // Salva as alterações no banco de dados
        await this.moviesRepository.save(movie);

        // Limpa o cache após a atualização, para que não continue exibindo os dados anteriores
        await redis.del("all:movies");

        return movie;
    }

    // DELETA UM FILME
    async movieDelete(id: number): Promise<string>{
        const movie = await this.moviesRepository.findOne({ where: {id} });

        if (!movie) {
            throw new NotFoundException(`Não foi encontrado o filme com o id: ${id} `);
        }

        await this.moviesRepository.delete(id);

        return `O filme com o id ${id} foi deletado com sucesso!`;
    }
}