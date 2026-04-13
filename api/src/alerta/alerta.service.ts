import { Injectable } from '@nestjs/common';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertaService {
  constructor(private readonly prisma: PrismaService) { }

  create(createAlertaDto: CreateAlertaDto) {
    return 'This action adds a new alerta';
  }

  findAll() {
    return this.prisma.alerta.findMany(
      {
        select: {
          fichaId: true,
          alunoId: true,
          lido: true,
          mensagem: true,
          aluno: {
            select: {
              nome: true,
            }
          }
        }
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} alerta`;
  }

  update(id: number, updateAlertaDto: UpdateAlertaDto) {
    return `This action updates a #${id} alerta`;
  }

  remove(id: number) {
    return `This action removes a #${id} alerta`;
  }



  async verificarFichas() {
    console.log("Verificando fichas para gerar alertas...");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const daqui3Dias = new Date(hoje);
    daqui3Dias.setDate(hoje.getDate() + 3);
    daqui3Dias.setHours(23, 59, 59, 999);

    // Busca fichas vencidas OU que vencem nos próximos 3 dias
    const fichas = await this.prisma.ficha.findMany({
      where: {
        ativa: true,
        data_fim: {
          lte: daqui3Dias,
        },
      },
    });

    console.log(`Encontradas ${fichas.length} fichas para verificar.`);

    for (const ficha of fichas) {
      const dataFim = new Date(ficha.data_fim);
      dataFim.setHours(0, 0, 0, 0);

      let tipo: "vencida" | "proxima" | null = null;
      let mensagem = "";

      if (dataFim < hoje) {
        tipo = "vencida";
        const diasVencida = Math.floor(
          (hoje.getTime() - dataFim.getTime()) / (1000 * 60 * 60 * 24)
        );
        mensagem =
          diasVencida === 1
            ? "Ficha venceu ontem"
            : `Ficha vencida há ${diasVencida} dias`;
      } else {
        const diffDias = Math.floor(
          (dataFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDias <= 3) {
          tipo = "proxima";
          mensagem =
            diffDias === 0
              ? "Ficha vence hoje!"
              : diffDias === 1
                ? "Ficha expira amanhã"
                : `Ficha expira em ${diffDias} dias`;
        }
      }

      if (!tipo) continue;

      // Busca alerta existente por fichaId + tipo (sem depender da mensagem)
      const alertaExistente = await this.prisma.alerta.findFirst({
        where: {
          fichaId: ficha.id,
          tipo: "AUTOMATICO",
          // Garante que só atualiza alertas do mesmo "grupo" (vencida ou proxima)
          mensagem: {
            contains: tipo === "vencida" ? "vencid" : "expira",
          },
        },
      });

      if (alertaExistente) {
        // Atualiza a mensagem com a contagem de dias atual
        await this.prisma.alerta.update({
          where: { id: alertaExistente.id },
          data: {
            mensagem,
            lido: false,      // reabre o alerta se o usuário já tinha lido
            data_alerta: new Date(),
          },
        });
      } else {
        await this.prisma.alerta.create({
          data: {
            alunoId: ficha.alunoId,
            fichaId: ficha.id,
            tipo: "AUTOMATICO",
            mensagem,
          },
        });
      }
    }

    console.log("Verificação de fichas concluída.");
  }
}
