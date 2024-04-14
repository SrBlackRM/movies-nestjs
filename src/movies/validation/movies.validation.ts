import { IsInt, IsString, MaxLength } from "class-validator";


export class MovieValidation {
    id: number;
    @IsString()
    @MaxLength(340)
    title: string;
    @IsString()
    @MaxLength(10)
    release: string;
    @IsInt()
    releaseAge: number;
    @IsString()
    @MaxLength(140)
    genre: string;
    @IsString()
    @MaxLength(40)
    country: string;
    @IsString()
    @MaxLength(5)
    runtime: string;
    @IsInt()
    score: number;
    @IsString()
    @MaxLength(1200)
    overview: string;
}