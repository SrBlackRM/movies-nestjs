import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";

export class UsersValidation{
    @ApiProperty()
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @Length(3, 80, { message: 'Nome precisa ter entre 3 e 80 caracteres' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Usuário não pode ser vazio' })
    @Length(3, 80, { message: 'Usuário precisa ter entre 3 e 80 caracteres' })
    username: string;
  
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({ message: 'Email não pode ser vazio' })
    email: string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
      })
    password: string;
}