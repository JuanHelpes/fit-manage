import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get('quantity')
  quantity() {
    return this.alunoService.quantity();
  }

  @Get('ficha')
  findAlunosFicha() {
    return this.alunoService.findAlunosFicha();
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.alunoService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}
