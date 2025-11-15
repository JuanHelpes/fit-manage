import React, { useState, useMemo } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Divider,
    Grid,
    Stack
} from "@mui/material";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const InfosUser: React.FC = () => {
    const [editando, setEditando] = useState(false);

    const [dados, setDados] = useState({
        nome: "João Silva",
        peso: 75,
        altura: 1.78,
        gordura: 14,
        braco: 34,
        cintura: 80,
        perna: 55,
    });

    const [historico, setHistorico] = useState([
        {
            data: "01/08/2025",
            peso: 72,
            gordura: 16,
            braco: 33,
            cintura: 83,
            perna: 54,
        },
        {
            data: "01/09/2025",
            peso: 74,
            gordura: 15,
            braco: 34,
            cintura: 81,
            perna: 55,
        },
        {
            data: "01/10/2025",
            peso: 75,
            gordura: 14,
            braco: 34.5,
            cintura: 80,
            perna: 55.5,
        },
    ]);

    const imc = useMemo(() => {
        if (!dados.peso || !dados.altura) return 0;
        return (dados.peso / (dados.altura * dados.altura)).toFixed(1);
    }, [dados]);

    const handleSalvar = () => {
        setEditando(false);
        setHistorico((prev) => [
            ...prev,
            {
                data: new Date().toLocaleDateString("pt-BR"),
                peso: Number(dados.peso),
                gordura: Number(dados.gordura),
                braco: Number(dados.braco),
                cintura: Number(dados.cintura),
                perna: Number(dados.perna),
            },
        ]);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                bgcolor: "#fafafa",
                //minHeight: "100vh",
                height: "100%",

            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Evolução Física
            </Typography>

            {/* 📋 Informações básicas */}
            <Card sx={{ borderRadius: 3, p: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Informações do Aluno
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        {[
                            { label: "Nome", field: "nome" },
                            { label: "Peso (kg)", field: "peso" },
                            { label: "Altura (m)", field: "altura" },
                            { label: "% Gordura Corporal", field: "gordura" },
                            { label: "Braço (cm)", field: "braco" },
                            { label: "Cintura (cm)", field: "cintura" },
                            { label: "Perna (cm)", field: "perna" },
                        ].map((item) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.field}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label={item.label}
                                    value={dados[item.field as keyof typeof dados] ?? ""}
                                    onChange={(e) =>
                                        setDados((prev) => ({
                                            ...prev,
                                            [item.field]: e.target.value,
                                        }))
                                    }
                                    disabled={!editando}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Stack direction="row" spacing={2} mt={3}>
                        {editando ? (
                            <Button variant="contained" onClick={handleSalvar}>
                                Salvar
                            </Button>
                        ) : (
                            <Button variant="outlined" onClick={() => setEditando(true)}>
                                Editar Informações
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            {/* 📈 IMC (compacto) */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card sx={{ borderRadius: 3, p: 2, mb: 3 }}>
                    <CardContent sx={{ py: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    IMC
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="#424242">
                                    {imc}
                                </Typography>
                            </Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ maxWidth: 200, textAlign: "right" }}
                            >
                                O IMC é uma estimativa da relação entre peso e altura. Valores entre
                                <strong> 18,5 e 24,9 </strong> são considerados dentro da faixa saudável.
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 📊 Evolução visual */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card sx={{ borderRadius: 3, p: 2, mb: 7 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Evolução dos Indicadores
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {historico.length > 1 ? (
                            <Stack spacing={3}>
                                {historico.map((reg, i) => {
                                    if (i === 0) return null;
                                    const anterior = historico[i - 1];

                                    const getStatus = (novo: number, antigo: number) => {
                                        if (novo > antigo)
                                            return { icon: <TrendingUp size={18} color="#2e7d32" />, label: "Aumento" };
                                        if (novo < antigo)
                                            return { icon: <TrendingDown size={18} color="#c62828" />, label: "Diminuição" };
                                        return { icon: <Minus size={18} color="#757575" />, label: "Sem alteração" };
                                    };

                                    const indicadores = [
                                        { nome: "Peso (kg)", valor: reg.peso, ant: anterior.peso },
                                        { nome: "% Gordura", valor: reg.gordura, ant: anterior.gordura },
                                        { nome: "Braço (cm)", valor: reg.braco, ant: anterior.braco },
                                        { nome: "Cintura (cm)", valor: reg.cintura, ant: anterior.cintura },
                                        { nome: "Perna (cm)", valor: reg.perna, ant: anterior.perna },
                                    ].filter((ind) => ind.valor !== null && ind.valor !== undefined);

                                    return (
                                        <Box
                                            key={reg.data}
                                            sx={{
                                                borderRadius: 2,
                                                bgcolor: "#f9f9f9",
                                                p: 2,
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                            }}
                                        >
                                            {/* 🗓️ Datas de comparação */}
                                            <Stack direction="row" justifyContent="space-between" mb={1}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {anterior.data}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {reg.data}
                                                </Typography>
                                            </Stack>

                                            {/* 🧮 Tabela de comparação */}
                                            <Box
                                                sx={{
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr auto 1fr auto",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight={600} color="text.secondary">
                                                    Anterior
                                                </Typography>
                                                <Box />
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                    color="text.secondary"
                                                    textAlign="right"
                                                >
                                                    Atual
                                                </Typography>
                                                <Box />

                                                {indicadores.map((ind) => {
                                                    const status = getStatus(ind.valor, ind.ant);
                                                    return (
                                                        <React.Fragment key={ind.nome}>
                                                            <Typography variant="body2">{ind.ant ?? "-"}</Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {ind.nome}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                textAlign="right"
                                                                fontWeight={600}
                                                            >
                                                                {ind.valor ?? "-"}
                                                            </Typography>
                                                            <Box>{status.icon}</Box>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Adicione dados de evolução para visualizar seu progresso ao longo do tempo.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </motion.div>


        </Box>
    );
};

export default InfosUser;
