import React, { useState } from "react";
import {
    Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText,
    TextField, MenuItem, Button, Card, CardContent, Divider, Grid, Select, InputLabel, FormControl
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

interface Exercicio {
    nome: string;
    repet: string;
    descanso: string;
    separacao: string;
}

interface Grupo {
    nome: string;
    exercicios: Exercicio[];
}

const gruposPadrao: Grupo[] = [
    {
        nome: "COSTAS",
        exercicios: [
            { nome: "Puxador Aberto", repet: "3x10", descanso: "60", separacao: "" },
            { nome: "Remada Triângulo", repet: "3x10", descanso: "60", separacao: "" },
            { nome: "Graviton", repet: "3x10", descanso: "60", separacao: "" },
            { nome: "Voador Dorsal", repet: "3x10", descanso: "60", separacao: "" },
            { nome: "Máq Lombar", repet: "3x10", descanso: "60", separacao: "" },
        ],
    },
    {
        nome: "PERNA",
        exercicios: [
            { nome: "Cadeira Extensora", repet: "3x10", descanso: "90", separacao: "" },
            { nome: "Leg 45", repet: "3x10", descanso: "90", separacao: "" },
            { nome: "Agachamento", repet: "3x10", descanso: "90", separacao: "" },
        ],
    },
    {
        nome: "BÍCEPS",
        exercicios: [
            { nome: "Scott", repet: "3x10", descanso: "60", separacao: "" },
            { nome: "Rosca Direta", repet: "3x10", descanso: "60", separacao: "" },
        ],
    },
];

// Cores de destaque para cada treino A–E
const treinoColors: Record<string, string> = {
    A: "#ff7043",
    B: "#42a5f5",
    C: "#66bb6a",
    D: "#ab47bc",
    E: "#ffa726",
};

const CadastroFicha: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [grupos, setGrupos] = useState<Grupo[]>(gruposPadrao);
    const [fichaInfo, setFichaInfo] = useState({
        aluno: "",
        objetivo: "",
        inicio: "",
        fim: "",
    });

    const alunos = ["João Silva", "Maria Oliveira", "Pedro Souza"];

    const handleChangeExercicio = (
        grupoIndex: number,
        exIndex: number,
        campo: keyof Exercicio,
        valor: string
    ) => {
        const novaLista = [...grupos];
        novaLista[grupoIndex].exercicios[exIndex][campo] = valor;
        setGrupos(novaLista);
    };

    const handleAddExercicio = (grupoIndex: number) => {
        const novaLista = [...grupos];
        novaLista[grupoIndex].exercicios.push({
            nome: "Novo exercício",
            repet: "3x10",
            descanso: "60",
            separacao: "",
        });
        setGrupos(novaLista);
    };

    const handleRemoveExercicio = (grupoIndex: number, exIndex: number) => {
        const novaLista = [...grupos];
        novaLista[grupoIndex].exercicios.splice(exIndex, 1);
        setGrupos(novaLista);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", bgcolor: "#fafafa" }}>
            {/* Drawer lateral */}
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Menu</Typography>
                    <List>
                        {["Início", "Cadastrar Ficha", "Histórico", "Alunos", "Configurações", "Sair"].map((text) => (
                            <ListItem key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1 }}>
                {/* AppBar */}
                <AppBar position="static" sx={{ bgcolor: "#ff6f00" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Cadastrar Ficha
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3 }}>
                    {/* Cabeçalho da ficha */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Informações da Ficha</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Aluno</InputLabel>
                                        <Select
                                            value={fichaInfo.aluno}
                                            label="Aluno"
                                            onChange={(e) => setFichaInfo({ ...fichaInfo, aluno: e.target.value })}
                                        >
                                            {alunos.map((a) => (
                                                <MenuItem key={a} value={a}>{a}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Objetivo"
                                        fullWidth
                                        value={fichaInfo.objetivo}
                                        onChange={(e) => setFichaInfo({ ...fichaInfo, objetivo: e.target.value })}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Data Início"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={fichaInfo.inicio}
                                        onChange={(e) => setFichaInfo({ ...fichaInfo, inicio: e.target.value })}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        label="Data Fim"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={fichaInfo.fim}
                                        onChange={(e) => setFichaInfo({ ...fichaInfo, fim: e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Montagem dos grupos */}
                    {grupos.map((grupo, gi) => (
                        <motion.div key={grupo.nome} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>{grupo.nome}</Typography>
                                    {grupo.exercicios.map((ex, ei) => {
                                        const color = treinoColors[ex.separacao.toUpperCase()] || "#ccc";
                                        const hasTreino = !!treinoColors[ex.separacao.toUpperCase()];

                                        return (
                                            <Grid
                                                container
                                                spacing={1}
                                                key={ei}
                                                alignItems="center"
                                                sx={{
                                                    mb: 1,
                                                    //border: hasTreino ? `2px solid ${color}` : "1px solid #ddd",
                                                    borderRadius: 2,
                                                    p: 1,
                                                    transition: "0.2s",
                                                }}
                                            >
                                                <Grid size={{ xs: 12, md: 3 }}>
                                                    <TextField
                                                        label="Exercício"
                                                        fullWidth
                                                        value={ex.nome}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderColor: hasTreino ? `${color}` : "#ddd", // cor padrão da borda
                                                                },
                                                            }
                                                        }}
                                                        onChange={(e) => handleChangeExercicio(gi, ei, "nome", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 3 }}>
                                                    <TextField
                                                        label="Repet."
                                                        fullWidth
                                                        value={ex.repet}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderColor: hasTreino ? `${color}` : "#ddd", // cor padrão da borda
                                                                },
                                                            }
                                                        }}
                                                        onChange={(e) => handleChangeExercicio(gi, ei, "repet", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 3 }}>
                                                    <TextField
                                                        label="Descanso (s)"
                                                        fullWidth
                                                        value={ex.descanso}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderColor: hasTreino ? `${color}` : "#ddd", // cor padrão da borda
                                                                },
                                                            }
                                                        }}
                                                        onChange={(e) => handleChangeExercicio(gi, ei, "descanso", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 2.25 }}>
                                                    <TextField
                                                        label="Treino (A–E)"
                                                        fullWidth
                                                        value={ex.separacao}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderColor: hasTreino ? `${color}` : "#ddd", // cor padrão da borda
                                                                },
                                                            }
                                                        }}
                                                        onChange={(e) => handleChangeExercicio(gi, ei, "separacao", e.target.value.toUpperCase())}
                                                    />
                                                </Grid>
                                                <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} size={{ xs: 12, md: 0.75 }}>
                                                    <IconButton color="error" onClick={() => handleRemoveExercicio(gi, ei)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                    <Button startIcon={<AddIcon />} onClick={() => handleAddExercicio(gi)}>
                                        Adicionar Exercício
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    <Divider sx={{ my: 3 }} />

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ backgroundColor: "#ff6f00" }}
                    >
                        Salvar Ficha
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CadastroFicha;
