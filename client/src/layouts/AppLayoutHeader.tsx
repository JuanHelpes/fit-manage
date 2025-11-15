import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";

const AppLayoutHeader: React.FC = () => {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
            <Header />
            <Box sx={{ p: 3 }}>
                <Outlet /> {/* Aqui entram as páginas (ex: Alunos, Histórico, etc) */}
            </Box>
        </Box>
    );
};

export default AppLayoutHeader;
