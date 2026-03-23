import { Injectable } from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InstrutorService {
  constructor(private readonly prisma: PrismaService) {}
    
  async create(createInstrutorDto: CreateInstrutorDto) {
        const data = { 
          ...createInstrutorDto,
          senha_hash: await bcrypt.hash(createInstrutorDto.senha_hash, 10)
        };
    
        const createdInstrutor = await this.prisma.instrutor.create({
          data
        })
    
        return {
          ...createdInstrutor,
          senha_hash: undefined
        }; 
  }

  findAll() {
    return `This action returns all instrutor`;
  }

  findByEmail(email: string) {
    return this.prisma.instrutor.findUnique({
      where: {
        email
      }
    });
  }

  update(id: number, updateInstrutorDto: UpdateInstrutorDto) {
    return `This action updates a #${id} instrutor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instrutor`;
  }
}
