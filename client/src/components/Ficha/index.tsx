import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,

    TextField,
    Divider,
    useMediaQuery,
    Stack,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    IconButton,
    Tooltip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PlayArrow, Pause, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

interface Exercicio {
    nome: string;
    repet: string;
    carga?: string;
    descanso?: string;
    concluido?: boolean;
}

interface GrupoTreino {
    separacaoTreino: string; // Ex: "A", "B", "C"
    tipo: string; // Ex: "COSTAS"
    exercicios: Exercicio[];
}

const treinoData: GrupoTreino[] = [
    {
        separacaoTreino: "C",
        tipo: "COSTAS",
        exercicios: [
            { nome: "Puxador Aberto", repet: "3x10 a 12", carga: "40", descanso: "60" },
            { nome: "Remada Triângulo", repet: "3x10 a 12", carga: "35", descanso: "60" },
            { nome: "Graviton", repet: "3x10 a 12", carga: "50", descanso: "60" },
            { nome: "Voador Dorsal", repet: "3x10 a 12", carga: "30", descanso: "60" },
        ],
    },
    {
        separacaoTreino: "C",
        tipo: "BÍCEPS",
        exercicios: [
            { nome: "Scott", repet: "3x10 a 12", carga: "20", descanso: "60" },
            { nome: "Rosca Direta", repet: "3x10 a 12", carga: "25", descanso: "60" },
            { nome: "Rosca Alternada", repet: "3x10 a 12", carga: "22", descanso: "60" },
            { nome: "Rosca Banco 45°", repet: "3x10 a 12", carga: "20", descanso: "60" },
        ],
    },
    {
        separacaoTreino: "B",
        tipo: "PERNA",
        exercicios: [
            { nome: "Cadeira Extensora", repet: "3x10 a 12", carga: "60", descanso: "90" },
            { nome: "Leg 45", repet: "3x10 a 12", carga: "100", descanso: "90" },
            { nome: "Agachamento Hack", repet: "3x10 a 12", carga: "80", descanso: "90" },
            { nome: "Flexora Sentada", repet: "3x10 a 12", carga: "45", descanso: "90" },
            { nome: "Cadeira Adutora", repet: "3x15 a 20", carga: "40", descanso: "60" },
        ],
    },
];

const Ficha: React.FC = () => {
    const [treino, setTreino] = useState<GrupoTreino[]>(treinoData);
    const [treinoSelecionado, setTreinoSelecionado] = useState<string>("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // cronômetro
    const [timers, setTimers] = useState<{ [key: string]: number }>({});
    const [running, setRunning] = useState<{ [key: string]: boolean }>({});

    // gerar key única por grupo + exercício
    const makeKey = (tipo: string, index: number) => `${tipo}-${index}`;

    // iniciar/pausar timer
    const toggleTimer = (tipo: string, index: number) => {
        const key = makeKey(tipo, index);
        setRunning((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // atualiza cronômetros ativos
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prev) => {
                const updated = { ...prev };
                Object.keys(running).forEach((key) => {
                    if (running[key]) {
                        updated[key] = (updated[key] || 0) + 1;
                    }
                });
                return updated;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [running]);

    // parar cronômetro e salvar tempo em descanso
    const pauseAndSave = (tipo: string, index: number) => {
        const key = makeKey(tipo, index);
        const seconds = timers[key] || 0;
        toggleTimer(tipo, index); // pausa
        handleInputChange(tipo, index, "descanso", seconds.toString());
        setTimers((prev) => ({ ...prev, [key]: 0 })); // reseta
    };

    const handleInputChange = (
        tipo: string,
        index: number,
        campo: keyof Exercicio,
        valor: string | boolean
    ) => {
        const novoTreino = treino.map((grupo) =>
            grupo.tipo === tipo
                ? {
                    ...grupo,
                    exercicios: grupo.exercicios.map((ex, i) =>
                        i === index ? { ...ex, [campo]: valor } : ex
                    ),
                }
                : grupo
        );
        setTreino(novoTreino);
    };

    const handleChangeTreino = (event: SelectChangeEvent) => {
        setTreinoSelecionado(event.target.value);
    };

    const gruposFiltrados = treinoSelecionado
        ? treino.filter((t) => t.separacaoTreino === treinoSelecionado)
        : [];

    const opcoesTreino = Array.from(new Set(treino.map((t) => t.separacaoTreino)));

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4 },
                m: 0,
                mb: 3,
                backgroundColor: "#f9f9f9",
                height: "100%",
            }}
        >
            {/* Cabeçalho */}
            <Box
                sx={{
                    textAlign: "center",
                    mb: 2,
                    pb: 1,
                    borderBottom: "2px solid #ff8c42",
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Data: ____ / ____ / ____
                </Typography>
            </Box>

            {/* Seletor de treino */}
            <FormControl
                fullWidth
                size="small"
                sx={{
                    maxWidth: 250,
                    mb: 3,
                    mx: "auto",
                    display: "flex",
                }}
            >
                <InputLabel id="treino-select-label">Treino</InputLabel>
                <Select
                    labelId="treino-select-label"
                    value={treinoSelecionado}
                    label="Treino"
                    onChange={handleChangeTreino}
                >
                    {opcoesTreino.map((op) => (
                        <MenuItem key={op} value={op}>
                            Treino {op}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Exibição */}
            {gruposFiltrados.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={2}
                >
                    Selecione um treino para visualizar os exercícios.
                </Typography>
            ) : (
                gruposFiltrados.map((grupo) => (
                    <Card
                        key={grupo.tipo}
                        sx={{
                            mb: 4,
                            boxShadow: 2,
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography
                                variant={isMobile ? "subtitle1" : "h6"}
                                sx={{
                                    mb: 2,
                                    backgroundColor: "#e3f2fd",
                                    p: 1,
                                    borderRadius: 1,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                {grupo.tipo}
                            </Typography>

                            <Stack spacing={2}>
                                {grupo.exercicios.map((ex, i) => {
                                    const key = makeKey(grupo.tipo, i);
                                    const ativo = running[key];
                                    return (
                                        <Box
                                            key={i}
                                            sx={{
                                                backgroundColor: "#fafafa",
                                                border: "1px solid #eee",
                                                p: 1.5,
                                                borderRadius: 2,
                                                position: "relative",
                                            }}
                                        >
                                            {/* Checkbox canto superior direito */}
                                            <Checkbox
                                                icon={<RadioButtonUnchecked />}
                                                checkedIcon={<CheckCircle color="success" />}
                                                checked={ex.concluido || false}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        grupo.tipo,
                                                        i,
                                                        "concluido",
                                                        e.target.checked
                                                    )
                                                }
                                                sx={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4,
                                                }}
                                            />

                                            <Typography fontWeight="bold">{ex.nome}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Repetições: {ex.repet}
                                            </Typography>

                                            {/* Campos + cronômetro */}
                                            <Stack direction="row" spacing={2} mt={1} alignItems="center">
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ display: "block", mb: 0.3 }}
                                                    >
                                                        Carga (kg)
                                                    </Typography>
                                                    <TextField
                                                        size="small"
                                                        value={ex.carga || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(grupo.tipo, i, "carga", e.target.value)
                                                        }
                                                        fullWidth
                                                    />
                                                </Box>

                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ display: "block", mb: 0.3 }}
                                                    >
                                                        Descanso (s)
                                                    </Typography>
                                                    <TextField
                                                        size="small"
                                                        value={ex.descanso || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(grupo.tipo, i, "descanso", e.target.value)
                                                        }
                                                        fullWidth
                                                    />
                                                </Box>

                                                {/* Botão do cronômetro */}
                                                <Tooltip title={ativo ? "Pausar" : "Iniciar"}>
                                                    <IconButton
                                                        color={ativo ? "error" : "primary"}
                                                        onClick={() =>
                                                            ativo
                                                                ? pauseAndSave(grupo.tipo, i)
                                                                : toggleTimer(grupo.tipo, i)
                                                        }
                                                    >
                                                        {ativo ? <Pause /> : <PlayArrow />}
                                                    </IconButton>
                                                </Tooltip>

                                                {/* Mostrador do tempo atual */}
                                                {ativo && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {timers[key] ?? 0}s
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Box>
                                    );
                                })}
                            </Stack>

                            <Divider sx={{ mt: 2 }} />
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default Ficha;
