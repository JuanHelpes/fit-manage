import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavbar from "../components/BottomNavBar";

const AppLayout: React.FC = () => {
    const location = useLocation();

    // Esconder navbar nas páginas de login e registro
    const hideNavbar = ["/", "/register"].includes(location.pathname);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
            <Outlet /> {/* Aqui entram as páginas */}
            {!hideNavbar && <BottomNavbar />}
        </Box>
    );
};

export default AppLayout;
