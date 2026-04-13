import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';

@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichaService.create(createFichaDto);
  }

  @Get()
  findAll() {
    return this.fichaService.findAll();
  }

  @Get('active')
  findActive() {
    return this.fichaService.findActive();
  }

  @Get('outdated')
  findOutdated() {
    return this.fichaService.findOutdated();
  }

  @Get('outdatedByAluno/:id')
  findOutdatedByAlunoId(@Param('id') id: string) {
    return this.fichaService.findOutdatedByAlunoId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fichaService.findOneById(id);
  }

  @Get('aluno/:id')
  findOneByAlunoId(@Param('id') id: string) {
    return this.fichaService.findOneByAlunoId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichaService.update(id, updateFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fichaService.remove(+id);
  }
}
