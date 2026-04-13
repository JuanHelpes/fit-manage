import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsString
} from 'class-validator';

export class CreateFichaDto {

    @IsString()
    alunoId!: string

    @IsString()
    instrutorId!: string

    @IsString()
    objetivo!: string

    @IsBoolean()
    ativa!: boolean

    @IsDateString()
    data_inicio!: string

    @IsDateString()
    data_fim!: string
    
    @IsArray()
    treinos!: any[]
}
