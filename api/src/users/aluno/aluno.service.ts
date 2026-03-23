import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlunoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAlunoDto: CreateAlunoDto) {
    const data = {
      ...createAlunoDto,
      senha_hash: await bcrypt.hash(createAlunoDto.senha_hash, 10)
    };

    const createdAluno = await this.prisma.aluno.create({
      data
    })

    return {
      ...createdAluno,
      senha_hash: undefined
    };
  }

  findAll() {
    return this.prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.aluno.findUnique({
      where: {
        email
      }
    });
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluno`;
  }
}
