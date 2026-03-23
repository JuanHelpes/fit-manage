import { Module } from '@nestjs/common';
import { InstrutorService } from './instrutor.service';
import { InstrutorController } from './instrutor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InstrutorController],
  providers: [InstrutorService],
  exports: [InstrutorService],
})
export class InstrutorModule {}
