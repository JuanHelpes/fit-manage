import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrutorService } from './instrutor.service';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';

@Controller('instrutor')
export class InstrutorController {
  constructor(private readonly instrutorService: InstrutorService) {}

  @Post()
  create(@Body() createInstrutorDto: CreateInstrutorDto) {
    return this.instrutorService.create(createInstrutorDto);
  }

  @Get()
  findAll() {
    return this.instrutorService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.instrutorService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstrutorDto: UpdateInstrutorDto) {
    return this.instrutorService.update(+id, updateInstrutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrutorService.remove(+id);
  }
}
