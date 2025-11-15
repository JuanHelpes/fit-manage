import React, { useState, useMemo } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    Divider,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";

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

interface ListaAlunosProps {
    alunos: Aluno[];
    onAbrirFicha: (aluno: Aluno) => void;
    onCriarFicha: (aluno: Aluno) => void;
    onAtualizarFicha: (aluno: Aluno) => void;
    onRemoverAluno: (aluno: Aluno) => void;
}

const ListaAlunos: React.FC<ListaAlunosProps> = ({
    alunos,
    onAbrirFicha,
    onCriarFicha,
    onAtualizarFicha,
    onRemoverAluno,
}) => {
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<"todas" | "ativa" | "vencida" | "semFicha">("todas");

    const getStatusLabel = (status?: "ativa" | "vencida" | "semFicha") => {
        switch (status) {
            case "ativa":
                return { label: "Ativa", color: "#4caf50" };
            case "vencida":
                return { label: "Vencida", color: "#ff9800" };
            case "semFicha":
            default:
                return { label: "Sem Ficha", color: "#f44336" };
        }
    };

    const alunosFiltrados = useMemo(() => {
        return alunos.filter((aluno) => {
            const buscaMatch = aluno.nome.toLowerCase().includes(busca.toLowerCase());
            const filtroMatch = filtro === "todas" || aluno.status === filtro;
            return buscaMatch && filtroMatch;
        });
    }, [alunos, busca, filtro]);

    return (
        <Box sx={{ mb: 2 }}>
            {/* 🔎 Barra de busca e filtros */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
                mb={2}
            >
                <TextField
                    label="Buscar aluno..."
                    size="small"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    sx={{ flex: 1 }}
                />

                <ToggleButtonGroup
                    value={filtro}
                    exclusive
                    onChange={(e, val) => val && setFiltro(val)}
                    size="small"
                    color="primary"
                >
                    <ToggleButton value="todas">Todas</ToggleButton>
                    <ToggleButton value="ativa">Ativas</ToggleButton>
                    <ToggleButton value="vencida">Vencidas</ToggleButton>
                    <ToggleButton value="semFicha">Sem ficha</ToggleButton>
                </ToggleButtonGroup>

                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {alunosFiltrados.length} aluno(s)
                </Typography>
            </Stack>

            {/* 📋 Lista compacta */}
            <Box sx={{ overflowY: "auto", maxHeight: 220 }}>
                {alunosFiltrados.map((aluno) => {
                    const { label, color } = getStatusLabel(aluno.status);

                    return (
                        <Paper
                            key={aluno.id}
                            sx={{
                                p: 1.5,
                                mb: 1,
                                borderRadius: 2,
                                bgcolor: "#fff",
                                borderLeft: `5px solid ${color}`,
                                boxShadow: "0px 1px 3px rgba(0,0,0,0.08)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 0.5,
                                }}
                            >
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {aluno.nome}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color,
                                        fontWeight: "bold",
                                        border: `1px solid ${color}`,
                                        borderRadius: "12px",
                                        px: 1,
                                        py: 0.2,
                                        textTransform: "uppercase",
                                        bgcolor: `${color}15`,
                                    }}
                                >
                                    {label}
                                </Typography>
                            </Box>

                            {aluno.fichaAtual ? (
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: 13, color: "#555", mb: 0.5 }}
                                >
                                    {aluno.fichaAtual.objetivo} |{" "}
                                    <span style={{ color: "#777", fontSize: "12px" }}>
                                        {aluno.fichaAtual.dataInicio} – {aluno.fichaAtual.dataFim}
                                    </span>
                                </Typography>
                            ) : (
                                <Typography variant="body2" sx={{ fontSize: 13, color: "#777", mb: 0.5 }}>
                                    Nenhuma ficha cadastrada
                                </Typography>
                            )}

                            <Divider sx={{ my: 0.8 }} />

                            {/* Botões de ação mais compactos */}
                            <Stack direction="row" spacing={0.8} flexWrap="wrap">
                                {aluno.status === "semFicha" && (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onCriarFicha(aluno)}
                                        sx={{ fontSize: "0.7rem", py: 0.3 }}
                                    >
                                        Criar
                                    </Button>
                                )}

                                {aluno.status === "vencida" && (
                                    <>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="warning"
                                            onClick={() => onAtualizarFicha(aluno)}
                                            sx={{ fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Atualizar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="info"
                                            onClick={() => onAbrirFicha(aluno)}
                                            sx={{ fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Ver
                                        </Button>
                                    </>
                                )}

                                {aluno.status === "ativa" && (
                                    <>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="info"
                                            onClick={() => onAbrirFicha(aluno)}
                                            sx={{ fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="warning"
                                            onClick={() => onAtualizarFicha(aluno)}
                                            sx={{ fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Atualizar
                                        </Button>
                                    </>
                                )}

                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onRemoverAluno(aluno)}
                                    sx={{ fontSize: "0.7rem", py: 0.3 }}
                                >
                                    Remover
                                </Button>
                            </Stack>
                        </Paper>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ListaAlunos;
