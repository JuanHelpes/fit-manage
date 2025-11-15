import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Divider,
    Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";

const ConfiguracoesPersonal: React.FC = () => {
    const [personal, setPersonal] = useState({
        nome: "Carlos Silva",
        cref: "CREF 123456-SP",
        email: "carlos.silva@academiafit.com",
        telefone: "(11) 99999-9999",
        horario: "Seg a Sex - 07h às 21h",
    });

    const [senha, setSenha] = useState("");
    const [emailAluno, setEmailAluno] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [editandoInfos, setEditandoInfos] = useState(false);
    const [editandoSenha, setEditandoSenha] = useState(false);

    const handleChange = (campo: string, valor: string) => {
        setPersonal({ ...personal, [campo]: valor });
    };

    const handleSalvarInfos = () => {
        setEditandoInfos(false);
        setOpenSnackbar(true);
    };

    const handleSalvarSenha = () => {
        if (senha.trim() === "") return;
        console.log("Nova senha:", senha);
        setSenha("");
        setEditandoSenha(false);
        setOpenSnackbar(true);
    };

    const handleEnviarConvite = () => {
        if (emailAluno.trim() === "") return;
        console.log(`Convite enviado para: ${emailAluno}`);
        setEmailAluno("");
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                Configurações do Personal
            </Typography>

            {/* Card: Dados pessoais */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card sx={{ mb: 4, p: 2 }}>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Informações Pessoais
                            </Typography>
                            {!editandoInfos ? (
                                <Button variant="outlined" onClick={() => setEditandoInfos(true)}>
                                    Editar Informações
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleSalvarInfos}>
                                    Salvar Alterações
                                </Button>
                            )}
                        </Box>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Nome"
                                    fullWidth
                                    value={personal.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                    disabled={!editandoInfos}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Especialidade / CREF"
                                    fullWidth
                                    value={personal.cref}
                                    onChange={(e) => handleChange("cref", e.target.value)}
                                    disabled={!editandoInfos}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="E-mail"
                                    fullWidth
                                    value={personal.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    disabled={!editandoInfos}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Telefone"
                                    fullWidth
                                    value={personal.telefone}
                                    onChange={(e) => handleChange("telefone", e.target.value)}
                                    disabled={!editandoInfos}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Horário de atendimento"
                                    fullWidth
                                    value={personal.horario}
                                    onChange={(e) => handleChange("horario", e.target.value)}
                                    disabled={!editandoInfos}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            {!editandoSenha ? (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setEditandoSenha(true)}
                                >
                                    Alterar Senha
                                </Button>
                            ) : (
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            label="Nova Senha"
                                            type="password"
                                            fullWidth
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSalvarSenha}
                                            fullWidth
                                        >
                                            Salvar Senha
                                        </Button>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => {
                                                setEditandoSenha(false);
                                                setSenha("");
                                            }}
                                            fullWidth
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Card: Convidar aluno */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card sx={{ mb: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                            Convidar Novo Aluno
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Envie um convite para o aluno se cadastrar. Ele receberá um e-mail com o link direto
                            para o aplicativo.
                        </Typography>

                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 12, md: 8 }}>
                                <TextField
                                    label="E-mail do aluno"
                                    fullWidth
                                    value={emailAluno}
                                    onChange={(e) => setEmailAluno(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: "#ff6f00" }}
                                    onClick={handleEnviarConvite}
                                >
                                    Enviar Convite
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </motion.div>

            <Divider />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                message="Ação realizada com sucesso!"
            />
        </Box>
    );
};

export default ConfiguracoesPersonal;
