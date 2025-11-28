import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import UserProfilePage from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomeMobile from "./pages/HomeMobile/HomeMobile";
import AppLayout from "./layouts/AppLayout";
import HistoryPage from "./pages/History/History";
import CadastroFicha from "./pages/CadastroFicha/CadastroFicha";

import ListaAlunos from "./pages/Alunos/ListaAlunos";
import AppLayoutHeader from "./layouts/AppLayoutHeader";
import DashboardPersonal from "./pages/DashboardPersonal/DashboardPersonal";
import ConfiguracoesPersonal from "./pages/ConfigPersonal/ConfigPersonal";
import HomeDesktop from "./pages/HomeDesktop/HomeDesktop";
import InfosUser from "./pages/InfosUser/InfosUser";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
        <Router>
          <Routes>
            {/* Páginas públicas (sem navbar) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Páginas com layout (header incluída) */}
            <Route element={<AppLayoutHeader />}>
              <Route path="/cadastro-ficha" element={<CadastroFicha />} />
              <Route path="/alunos" element={<ListaAlunos />} />
              <Route path="/dashboard" element={<DashboardPersonal />} />
              <Route path="/configuracoes" element={<ConfiguracoesPersonal />} />
              <Route path="/" element={<HomeDesktop />} />
            </Route>
            {/* Páginas com layout (navbar incluída) */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<HomeMobile />} />
              <Route path="/user" element={<UserProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/InfosUser" element={<InfosUser />} />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;