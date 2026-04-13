import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichaService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFichaDto: CreateFichaDto) {
    const data = {
      ...createFichaDto
    };

    const fichaAnterior = await this.findOneByAlunoId(createFichaDto.alunoId);

    if (fichaAnterior) {
      await this.prisma.ficha.update({
        where: {
          id: fichaAnterior.id
        },
        data: {
          ativa: false
        }
      });
    }

    const createdFicha = await this.prisma.ficha.create({
      data
    });

    return createdFicha;
  }

  findAll() {
    return `This action returns all ficha`;
  }

  findOneById(id: string) {
    return this.prisma.ficha.findUnique({
      where: {
        id
      }
    });
  }

  async findOneByAlunoId(id: string) {
    const ficha = await this.prisma.ficha.findFirst({
      where: {
        alunoId: id,
        ativa: true
      }
    });

    if (!ficha) return null;

    return {
      ...ficha,
      data_inicio: new Date(ficha.data_inicio).toLocaleDateString("pt-BR"),
      data_fim: new Date(ficha.data_fim).toLocaleDateString("pt-BR")
    };
  }

  update(id: string, updateFichaDto: UpdateFichaDto) {
    return this.prisma.ficha.update({
      where: {
        id
      },
      data: updateFichaDto
    });
  }

  findActive() {
    return this.prisma.ficha.count({
      where: {
        ativa: true
      }
    });
  }

  findOutdated() {
    return this.prisma.ficha.count({
      where: {
        data_fim: {
          lt: new Date()
        },
        ativa: true
      }
    });
  }

  async findOutdatedByAlunoId(id: string) {
    const fichas = await this.prisma.ficha.findMany({
      where: {
        alunoId: id,
        ativa: false
      }
    });

    if (!fichas) return null;

    return {
      fichas
    };

  }

  remove(id: number) {
    return `This action removes a #${id} ficha`;
  }
}
