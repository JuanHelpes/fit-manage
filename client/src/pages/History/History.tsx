import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Collapse,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion } from "framer-motion";
import BottomNavBar from "../../components/BottomNavBar";

const HistoryPage: React.FC = () => {
    // Exemplo de dados (mock)
    const [fichas] = useState([
        {
            fichaId: "ficha_2025_10",
            dataInicio: "2025-10-01",
            dataFim: "2025-10-28",
            treinos: [
                {
                    separacao: "A",
                    tipo: "PEITO",
                    exercicios: [
                        { nome: "Supino reto", carga: 40, reps: 10 },
                        { nome: "Crucifixo", carga: 22, reps: 12 },
                    ],
                },
                {
                    separacao: "B",
                    tipo: "COSTAS",
                    exercicios: [{ nome: "Puxada frente", carga: 35, reps: 10 }],
                },
            ],
        },
        {
            fichaId: "ficha_2025_09",
            dataInicio: "2025-09-02",
            dataFim: "2025-09-29",
            treinos: [
                {
                    separacao: "A",
                    tipo: "PERNA",
                    exercicios: [
                        { nome: "Agachamento", carga: 60, reps: 8 },
                        { nome: "Cadeira extensora", carga: 45, reps: 12 },
                    ],
                },
            ],
        },
    ]);

    const [expandedFicha, setExpandedFicha] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedFicha(expandedFicha === id ? null : id);
    };

    return (
        <Box
            sx={{
                bgcolor: "#fff",
                minHeight: "100vh",
                mb: 3, // espaço pro navbar
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#ff6f00",
                        mb: 2,
                    }}
                >
                    Histórico de Treinos
                </Typography>

                {fichas.map((ficha) => (
                    <motion.div
                        key={ficha.fichaId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            sx={{
                                mb: 2,
                                borderRadius: 3,
                                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <CardContent>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography fontWeight="bold" color="#000">
                                            Ficha ({ficha.dataInicio} — {ficha.dataFim})
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {ficha.treinos.length} treinos registrados
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={() => toggleExpand(ficha.fichaId)}>
                                        {expandedFicha === ficha.fichaId ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </IconButton>
                                </Box>

                                <Collapse in={expandedFicha === ficha.fichaId}>
                                    <Divider sx={{ my: 1 }} />
                                    {ficha.treinos.map((treino) => (
                                        <Box key={treino.separacao} sx={{ mb: 1 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: "#ff6f00", fontWeight: "bold" }}
                                            >
                                                Treino {treino.separacao} — {treino.tipo}
                                            </Typography>
                                            {treino.exercicios.map((ex, i) => (
                                                <Typography
                                                    key={i}
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {ex.nome} — {ex.carga}kg × {ex.reps} reps
                                                </Typography>
                                            ))}
                                        </Box>
                                    ))}
                                </Collapse>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            <BottomNavBar />
        </Box>
    );
};

export default HistoryPage;
