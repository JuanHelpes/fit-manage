import { Aluno } from "../entities/aluno.entity";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlunoDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    senha_hash: string;

    @IsString()
    nome: string;

    @IsNumber()
    @IsOptional()
    idade?: number;

    @IsBoolean()
    @IsOptional()
    login_google?: boolean;

}
