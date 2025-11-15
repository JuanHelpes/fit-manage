import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Chip,
    Divider,
    Drawer,
    ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";

interface Aluno {
    id: number;
    nome: string;
    fichaAtual?: {
        dataInicio: string;
        dataFim: string;
        objetivo: string;
    } | null;
}

const alunosMock: Aluno[] = [
    { id: 1, nome: "João Silva", fichaAtual: { dataInicio: "2025-09-01", dataFim: "2025-12-01", objetivo: "Hipertrofia" } },
    { id: 2, nome: "Maria Oliveira", fichaAtual: null },
    { id: 3, nome: "Pedro Souza", fichaAtual: { dataInicio: "2025-10-10", dataFim: "2026-01-10", objetivo: "Resistência" } },
    { id: 4, nome: "Lucas Pereira", fichaAtual: null },
];

const ListaAlunos: React.FC = () => {
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const alunosFiltrados = alunosMock.filter((a) =>
        a.nome.toLowerCase().includes(search.toLowerCase())
    );

    const handleAlunoClick = (aluno: Aluno) => {
        if (aluno.fichaAtual) {
            navigate(`/editar-ficha/${aluno.id}`);
        } else {
            navigate(`/cadastrar-ficha?aluno=${aluno.id}`);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>


            {/* Barra de pesquisa */}
            <Box sx={{ p: 2 }}>
                <TextField
                    placeholder="Buscar aluno..."
                    fullWidth
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Lista de alunos */}
            <List>
                {alunosFiltrados.map((aluno) => (
                    <React.Fragment key={aluno.id}>
                        <ListItem
                            onClick={() => handleAlunoClick(aluno)}
                            sx={{
                                bgcolor: "#fff",
                                borderRadius: 2,
                                boxShadow: 1,
                                my: 1,
                                mx: 2,
                                transition: "0.2s",
                                "&:hover": { boxShadow: 3, transform: "scale(1.01)" },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: aluno.fichaAtual ? "#43a047" : "#ff9800" }}>
                                    {aluno.fichaAtual ? (
                                        <AssignmentTurnedInIcon />
                                    ) : (
                                        <WarningAmberIcon />
                                    )}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {aluno.nome}
                                    </Typography>
                                }
                                secondary={
                                    aluno.fichaAtual ? (
                                        <>
                                            <Typography variant="body2" color="textSecondary">
                                                Objetivo: {aluno.fichaAtual.objetivo}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {aluno.fichaAtual.dataInicio} — {aluno.fichaAtual.dataFim}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            Nenhuma ficha cadastrada
                                        </Typography>
                                    )
                                }
                            />

                            {aluno.fichaAtual ? (
                                <Chip
                                    label="Ficha ativa"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                />
                            ) : (
                                <Chip
                                    label="Sem ficha"
                                    color="warning"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                />
                            )}
                        </ListItem>
                        <Divider variant="middle" />
                    </React.Fragment>
                ))}

                {alunosFiltrados.length === 0 && (
                    <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
                        Nenhum aluno encontrado.
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default ListaAlunos;
