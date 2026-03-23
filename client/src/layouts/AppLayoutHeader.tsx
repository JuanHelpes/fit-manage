import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";

const AppLayoutHeader: React.FC = () => {
    return (
        <Header />
    );
};

export default AppLayoutHeader;
