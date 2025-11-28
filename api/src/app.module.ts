import { Module } from '@nestjs/common';
import { AlunoModule } from './users/aluno/aluno.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AlunoModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
