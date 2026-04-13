import { Module } from '@nestjs/common';
import { AlunoModule } from './users/aluno/aluno.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FichaModule } from './ficha/ficha.module';
import { AlertaModule } from './alerta/alerta.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertaScheduler } from './scheduler/alerta.scheduler';
import { AlertaService } from './alerta/alerta.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
@Module({
  imports: [AlunoModule, AuthModule, PrismaModule, FichaModule, AlertaModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [AlertaScheduler, AlertaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
