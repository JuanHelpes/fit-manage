import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import CadastroFicha from "./pages/CadastroFicha/CadastroFicha";
import HistoryPage from "./pages/History/History";
import HomeMobile from "./pages/HomeMobile/HomeMobile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProfilePage from "./pages/UserProfile/UserProfile";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ListaAlunos from "./pages/Alunos/ListaAlunos";
import ConfiguracoesPersonal from "./pages/ConfigPersonal/ConfigPersonal";
import DashboardPersonal from "./pages/DashboardPersonal/DashboardPersonal";
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
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Páginas com layout (header incluída) */}
            <Route element={<ProtectedRoute allowedRoles={['instrutor']} />}>
              <Route path="/cadastro-ficha" element={<CadastroFicha />} />
              <Route path="/alunos" element={<ListaAlunos />} />
              <Route path="/dashboard" element={<DashboardPersonal />} />
              <Route path="/configuracoes" element={<ConfiguracoesPersonal />} />
              <Route path="/home-desktop" element={<HomeDesktop />} />
            </Route>
            {/* Páginas com layout (navbar incluída) */}
            <Route element={<ProtectedRoute allowedRoles={['aluno']} />}>
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