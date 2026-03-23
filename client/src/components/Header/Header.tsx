import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItemText,
    Box,
    Divider,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const HeaderDesktop: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const { logout } = React.useContext(AuthContext);

    // Define os títulos baseados nas rotas
    const routeTitles: Record<string, string> = {
        "/inicio": "Início",
        // "/alunos": "Alunos",
        "/cadastro-ficha": "Cadastrar Ficha",
        "/editar-ficha": "Editar Ficha",
        "/dashboard": "Dashboard",
        "/user": "Perfil do Usuário",
    };
    const titulo = routeTitles[location.pathname] || "Aplicação";

    const menuItems = [
        { text: "Início", path: "/home-desktop" },
        { text: "Cadastrar Ficha", path: "/cadastro-ficha" },
        { text: "Dashboard", path: "/dashboard" },
        // { text: "Alunos", path: "/alunos" },
    ];

    const userItems = [
        { text: "Configurações", path: "/configuracoes" },
        { text: "Sair", onClick: () => logout() },
    ];

    return (
        <>
            {/* Drawer lateral */}
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box sx={{ width: 260, p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Menu
                    </Typography>

                    <List>
                        {menuItems.map((item) => (
                            <ListItemButton

                                key={item.text}
                                onClick={() => {
                                    navigate(item.path);
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </List>

                    <Divider sx={{ my: 1 }} />

                    <List>
                        {userItems.map((item) => (
                            <ListItemButton

                                key={item.text}
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    } else {
                                        navigate(item.path? item.path : "/");
                                    }
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* AppBar superior */}
            <AppBar position="static" sx={{ bgcolor: "#ff6f00" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {titulo}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default HeaderDesktop;
