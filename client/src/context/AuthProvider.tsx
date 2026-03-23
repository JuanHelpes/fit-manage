import { createContext, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api"; // Importando a instância do Axios
import { jwtDecode } from "jwt-decode";

// Tipos para o usuário e contexto
type User = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
} | null;

type DecodedToken = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User;
  login: (email: string, password: string, role: string) => Promise<boolean | undefined>;
  login_Google: (email: string, jti: string, nome: string) => Promise<boolean | undefined>;
  logout: () => void;
  token: string | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

// Crie o contexto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  login_Google: async () => false,
  logout: () => {},
});

// Crie o provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Estado para armazenar a informação de login
const [token, setToken] = useState<string | null>(() => {
    // Já inicia lendo do localStorage
    return localStorage.getItem('token');
  });

  const [user, setUser] = useState<User>(() => {
    // Já inicia decodificando o token salvo
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decoded = jwtDecode<DecodedToken>(savedToken);
      return { id: decoded.sub, email: decoded.email, name: decoded.name, role: decoded.role };
    }
    return null;
  });

  // Função para login
  const login = async (email: string, password: string, role: string) => {
    const userPayload = {
      email: email,
      password: password,
      role: role
    };

    try {
      const response = await api.post("/login", userPayload);
      if (response.status === 401 || response.status === 500) {
        setUser(null);
        return false; // Login falhou
      } else {
        // Autenticação bem-sucedida
        const token = response.data.access_token;

        const decoded = jwtDecode<DecodedToken>(token);

        localStorage.setItem('token', token);
        setUser({ id: decoded.sub, email: decoded.email, name: decoded.name, role: decoded.role });
        setToken(token);
        return true; // Login bem-sucedido
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }
  };

  // Função para login com Google
  const login_Google = async (email: string, jti: string, nome: string) => {
    const userPayload = {
      email: email,
      jti: jti,
      nome: nome
    };

    try {
      const response = await api.post("user/GoogleLogin", userPayload);
      if (response.status === 401 || response.status === 500) {
        setUser(null);
        return false; // Login falhou
      } else {
        // Autenticação bem-sucedida
        const token = response.data.access_token;

        const decoded = jwtDecode<DecodedToken>(token);

        setUser({ id: decoded.sub, email: decoded.email, name: decoded.name, role: decoded.role });
        setToken(token);
        return true; // Login bem-sucedido
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, login_Google }}>
      {children}
    </AuthContext.Provider>
  );
};
