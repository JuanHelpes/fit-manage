import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Prisma Client's generated types may not include 'beforeExit' in $on event types;
    // cast to any to avoid the TS error while keeping runtime behavior.
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}