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

export class CreateInstrutorDto {
    @IsString()
    nome

    @IsEmail()
    email

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    senha_hash

    @IsString()
    @IsOptional()
    cref?

    @IsString()
    @IsOptional()
    especialidade?

    @IsString()
    @IsOptional()
    telefone?

    @IsString()
    @IsOptional()
    horario_atendimento?
}
