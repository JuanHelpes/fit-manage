import { AlertaService } from "src/alerta/alerta.service";
import { Injectable, Logger  } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class AlertaScheduler {
    constructor(private readonly alertaService: AlertaService) { }
    private readonly logger = new Logger(AlertaScheduler.name);
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
  timeZone: 'America/Sao_Paulo',
})
    //@Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        this.logger.debug('Called when the current second is 45');
        await this.alertaService.verificarFichas();
    }
}