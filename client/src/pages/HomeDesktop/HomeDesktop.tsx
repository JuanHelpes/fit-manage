import React from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from '@mui/icons-material/Dashboard';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const resumo = {
        alunos: 24,
        fichasAtivas: 18,
        fichasVencidas: 3,
    };

    const atalhos = [
        {
            titulo: "Dashboard",
            icone: <DashboardIcon sx={{ fontSize: 45 }} />,
            descricao: "Gerencie seus alunos, fichas e alertas.",
            cor: "#ff6f00",
            rota: "/dashboard",
        },
        {
            titulo: "Criar Ficha",
            icone: <FitnessCenterIcon sx={{ fontSize: 45 }} />,
            descricao: "Crie novas fichas de treino para seus alunos.",
            cor: "#212121",
            rota: "/cadastro-ficha",
        },
        {
            titulo: "Configurações",
            icone: <SettingsIcon sx={{ fontSize: 45 }} />,
            descricao: "Atualize suas informações e configure o sistema.",
            cor: "#ffb74d",
            rota: "/configuracoes",
        },
    ];

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "#fafafa",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Boas-vindas */}
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: "#ff6f00" }}>
                Bem-vindo de volta, Personal!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Acompanhe seus alunos e organize seus treinos com eficiência.
            </Typography>

            {/* Atalhos principais */}
            <Grid
                container
                spacing={3}
                justifyContent="center"
                width="100%"
                sx={{
                    mb: 5,
                    maxWidth: 1000,
                }}
            >
                {atalhos.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                onClick={() => navigate(item.rota)}
                                sx={{
                                    cursor: "pointer",
                                    textAlign: "center",
                                    borderRadius: 3,
                                    bgcolor: item.cor,
                                    color: item.cor === "#212121" ? "white" : "black",
                                    height: 220, // 🔸 Altura uniforme dos cards principais
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                        transition: "0.3s",
                                    },
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{item.icone}</Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {item.titulo}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, maxWidth: 220, lineHeight: 1.3 }}
                                >
                                    {item.descricao}
                                </Typography>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Resumo rápido */}
            <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{ maxWidth: 800, margin: "0 auto" }}
            >
                {[
                    { label: "Alunos Cadastrados", valor: resumo.alunos, cor: "#ff6f00" },
                    { label: "Fichas Ativas", valor: resumo.fichasAtivas, cor: "#424242" },
                    { label: "Fichas Vencidas", valor: resumo.fichasVencidas, cor: "#ffb74d" },
                ].map((card, i) => (
                    <Grid display="flex" justifyContent="center" size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                bgcolor: card.cor,
                                color: card.cor === "#424242" ? "white" : "black",
                                textAlign: "center",
                                py: 2,
                                height: 100, // 🔸 Altura uniforme dos cards de resumo
                                display: "flex",
                                alignItems: "center",
                                maxWidth: 200,
                                width: 200,
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold">
                                {card.valor}
                            </Typography>
                            <Typography
                                variant="body2"

                            >{card.label}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
