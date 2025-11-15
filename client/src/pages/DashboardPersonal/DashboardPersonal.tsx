import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ListaAlunos from "../../components/ListaAlunos/ListaAlunos";

const DashboardPersonal: React.FC = () => {
    const navigate = useNavigate();

    const resumo = { alunosAtivos: 24, fichasAtivas: 18, fichasExpirando: 3 };

    const ultimosAlunos = [
        { nome: "João Silva", ultimaAtualizacao: "25/10/2025" },
        { nome: "Maria Oliveira", ultimaAtualizacao: "22/10/2025" },
        { nome: "Pedro Souza", ultimaAtualizacao: "20/10/2025" },
    ];

    const alertas = [
        { aluno: "Maria Oliveira", mensagem: "Está há 14 dias sem atualizar treino" },
        { aluno: "Pedro Souza", mensagem: "Ficha expira em 2 dias" },
    ];

    const fichasVencendo = [
        { aluno: "João Silva", objetivo: "Hipertrofia", vencimento: "31/10/2025" },
        { aluno: "Pedro Souza", objetivo: "Condicionamento", vencimento: "01/11/2025" },
    ];

    interface Aluno {
        id: number;
        nome: string;
        status?: "ativa" | "vencida" | "semFicha";
        fichaAtual: {
            objetivo: string;
            dataInicio: string;
            dataFim: string;
            vencida: boolean;
        } | null;
    }

    const handleAtualizarFicha = (aluno: Aluno) => {
        console.log("Atualizar ficha de:", aluno.nome);
        // Aqui você pode redirecionar para a página de edição:
        navigate(`/editar-ficha?aluno=${encodeURIComponent(aluno.nome)}`);
    };

    const handleRemoverAluno = (aluno: Aluno) => {
        if (confirm(`Tem certeza que deseja remover ${aluno.nome}?`)) {
            console.log("Remover aluno:", aluno.nome);
            // Aqui você pode fazer a chamada à API para remover o aluno
        }
    };

    const alunosMock: Aluno[] = [
        {
            id: 1,
            nome: "João Silva",
            status: "ativa" as const,
            fichaAtual: {
                objetivo: "Hipertrofia",
                dataInicio: "01/10/2025",
                dataFim: "01/12/2025",
                vencida: false,
            },
        },
        {
            id: 2,
            nome: "Maria Souza",
            status: "vencida" as const,
            fichaAtual: {
                objetivo: "Emagrecimento",
                dataInicio: "10/07/2025",
                dataFim: "10/09/2025",
                vencida: true,
            },
        },
        {
            id: 3,
            nome: "Pedro Lima",
            status: "semFicha" as const,
            fichaAtual: null,
        },
    ];

    const handleAbrirFicha = (aluno: Aluno) => {
        console.log("Abrir ficha de:", aluno.nome);
    };

    const handleCriarFicha = (aluno: Aluno) => {
        console.log("Criar ficha para:", aluno.nome);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                bgcolor: "#fafafa",
                minHeight: "100vh",
            }}
        >
            {/* Cards Resumo */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                    { title: "Alunos Ativos", value: resumo.alunosAtivos, color: "#ff6f00", textColor: "white" },
                    { title: "Fichas Ativas", value: resumo.fichasAtivas, color: "#424242", textColor: "white" },
                    { title: "Fichas a Vencer", value: resumo.fichasExpirando, color: "#ffb74d", textColor: "black" },
                ].map((card, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card sx={{ bgcolor: card.color, color: card.textColor, borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="h6">{card.title}</Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {card.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* 🧾 Lista de Alunos */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        sx={{
                            height: 360,
                            borderRadius: 3,
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Lista de Alunos
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box sx={{ flex: 1 }}>
                            <ListaAlunos
                                alunos={alunosMock}
                                onAbrirFicha={handleAbrirFicha}
                                onCriarFicha={handleCriarFicha}
                                onAtualizarFicha={handleAtualizarFicha}
                                onRemoverAluno={handleRemoverAluno}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* 🔔 Alertas */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: 360, borderRadius: 3, p: 2, overflowY: "auto" }}>
                        <Typography variant="h6" gutterBottom>Alertas</Typography>
                        <Divider sx={{ mb: 1 }} />
                        {alertas.map((alerta, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Box
                                    sx={{
                                        p: 2,
                                        mb: 1,
                                        borderRadius: 2,
                                        bgcolor: "#ffe0b2",
                                        "&:hover": { bgcolor: "#ffcc80" },
                                    }}
                                >
                                    <Typography><strong>{alerta.aluno}</strong></Typography>
                                    <Typography sx={{ fontSize: 14 }}>{alerta.mensagem}</Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Card>
                </Grid>

                {/* 👥 Alunos Recentes */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: 360, borderRadius: 3, p: 2, overflowY: "auto" }}>
                        <Typography variant="h6" gutterBottom>Alunos Recentes</Typography>
                        <Divider sx={{ mb: 1 }} />
                        {ultimosAlunos.map((aluno, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1,
                                        mb: 1,
                                        borderRadius: 2,
                                        bgcolor: "#f5f5f5",
                                        "&:hover": { bgcolor: "#eeeeee" },
                                    }}
                                >
                                    <Typography><strong>{aluno.nome}</strong></Typography>
                                    <Typography sx={{ fontSize: 13, color: "#757575" }}>
                                        Última atualização: {aluno.ultimaAtualizacao}
                                    </Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Card>
                </Grid>

                {/* ⏰ Fichas Vencendo */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: 360, borderRadius: 3, p: 2, overflowY: "auto" }}>
                        <Typography variant="h6" gutterBottom>Fichas Vencendo Esta Semana</Typography>
                        <Divider sx={{ mb: 1 }} />
                        {fichasVencendo.map((ficha, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1,
                                        mb: 1,
                                        borderRadius: 2,
                                        bgcolor: "#f5f5f5",
                                        "&:hover": { bgcolor: "#eeeeee" },
                                    }}
                                >
                                    <Box>
                                        <Typography><strong>{ficha.aluno}</strong></Typography>
                                        <Typography sx={{ fontSize: 13 }}>{ficha.objetivo}</Typography>
                                        <Typography sx={{ fontSize: 12, color: "#757575" }}>
                                            Vence: {ficha.vencimento}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            navigate(`/cadastro-ficha?aluno=${encodeURIComponent(ficha.aluno)}`)
                                        }
                                    >
                                        Criar Nova Ficha
                                    </Button>
                                </Box>
                            </motion.div>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPersonal;
