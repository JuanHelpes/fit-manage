import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FichaModule } from 'src/ficha/ficha.module';

@Module({
  imports: [PrismaModule, FichaModule],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService],
})
export class AlunoModule {}
