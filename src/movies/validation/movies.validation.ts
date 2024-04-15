import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength } from "class-validator";


export class MovieValidation {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsString()
    @MaxLength(340)
    title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    release: string;
    
    @ApiProperty()
    @IsInt()
    releaseAge: number;

    @ApiProperty()
    @IsString()
    @MaxLength(140)
    genre: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    country: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(5)
    runtime: string;
    
    @ApiProperty()
    @IsInt()
    score: number;
    
    @ApiProperty()
    @IsString()
    @MaxLength(1200)
    overview: string;
}