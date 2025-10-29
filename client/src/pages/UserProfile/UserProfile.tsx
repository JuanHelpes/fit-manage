import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Logout, Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface UserProfileProps {
    user: {
        name: string;
        email: string;
        isGoogleUser?: boolean;
        icon: string;
    };
    onSave: (updatedUser: { name: string; password?: string; icon: string }) => void;
    onLogout: () => void;
}

const predefinedIcons = [
    "🔥",
    "💪",
    "⚡",
    "🏋️",
    "🏃‍♂️",
    "🎯",
    "🦾",
    "🧠",
    "🏆",
];

const UserProfile: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const user = { name: "Juan", email: "juan@gmail.com", isGoogleUser: false, icon: "🔥" };
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [icon, setIcon] = useState(user.icon);
    const [editingIcon, setEditingIcon] = useState(false);

    // const handleSave = () => {
    //     const updated = { name, icon, ...((!user.isGoogleUser && password) ? { password } : {}) };
    //     // onSave(updated);
    // };

    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#fff",
            }}
        >
            {/* Header */}
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 3, color: "#000", textAlign: "center" }}
            >
                Editar Perfil
            </Typography>

            {/* Avatar / Icon */}
            <Box sx={{ position: "relative", mb: 3 }}>
                <Avatar
                    sx={{
                        bgcolor: "#ffffffff",
                        color: "#fff",
                        width: isMobile ? 80 : 100,
                        height: isMobile ? 80 : 100,
                        fontSize: isMobile ? 36 : 48,
                    }}
                >
                    {icon}
                </Avatar>
                <IconButton
                    onClick={() => setEditingIcon(!editingIcon)}
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "#fff",
                        width: isMobile ? 30 : 40,
                        height: isMobile ? 30 : 40,
                        border: "2px solid #ff6b00",
                        "&:hover": { bgcolor: "#ffe4cc" },
                    }}
                >
                    <Edit sx={{ color: "#ff6b00" }} />
                </IconButton>
            </Box>

            {/* Seleção de ícones */}
            {editingIcon && (
                <Grid container spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                    {predefinedIcons.map((ic) => (
                        <Grid key={ic}>
                            <IconButton
                                onClick={() => {
                                    setIcon(ic);
                                    setEditingIcon(false);
                                }}
                                sx={{
                                    bgcolor: ic === icon ? "#ff6b00" : "#f1f1f1",
                                    color: ic === icon ? "#fff" : "#000",
                                    width: 50,
                                    height: 50,
                                    fontSize: 24,
                                    borderRadius: "50%",
                                }}
                            >
                                {ic}
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Form */}
            <Box
                component="form"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: 2,
                    }}
                />

                {!user.isGoogleUser && (
                    <TextField
                        label="Nova Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: "#fff",
                            borderRadius: 2,
                        }}
                    />
                )}

                <Button
                    variant="contained"
                    // onClick={handleSave}
                    sx={{
                        mt: 2,
                        bgcolor: "#ff6b00",
                        "&:hover": { bgcolor: "#e65c00" },
                        fontWeight: "bold",
                        color: "#fff",
                    }}
                >
                    Salvar Alterações
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<Logout />}
                    // onClick={onLogout}
                    sx={{
                        mt: 2,
                        borderColor: "#000",
                        color: "#000",
                        "&:hover": {
                            bgcolor: "#000",
                            color: "#fff",
                        },
                    }}
                >
                    Sair
                </Button>
            </Box>
        </Container>
    );
};

export default UserProfile;
