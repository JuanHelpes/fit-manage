import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import UserProfilePage from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import HistoryPage from "./pages/History/History";
import CadastroFicha from "./pages/CadastroFicha/CadastroFicha";

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
            <Route path="/cadastro-ficha" element={<CadastroFicha />} />
            {/* Páginas com layout (navbar incluída) */}
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/user" element={<UserProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;