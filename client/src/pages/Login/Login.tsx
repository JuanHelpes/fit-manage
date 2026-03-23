import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, Link, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Logo from '../../components/Logo';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

type UserType = 'instrutor' | 'aluno';

type GoogleJwtPayload = {
    email: string;
    jti: string;
    name: string;
    [key: string]: any;
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [userType, setUserType] = useState<UserType>(isLargeScreen ? 'instrutor' : 'aluno');

    const { login, login_Google } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !senha) {
            toast.error('Preencha todos os campos.');
            return;
        }
        const success = await login(email, senha, userType);
        if (success) {
            toast.success('Bem Vindo!');
            userType === 'instrutor' ? navigate('/home-desktop') : navigate('/home');
        }
        else {
            toast.error('Credenciais inválidas. Tente novamente.');
        }
    };

    const handleGoogleLogin = async (res: any) => {
        navigate('/Home');
    };

    const handleRegister = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/register');
    };

    const toggleStyles = {
        wrapper: {
            display: 'flex',
            width: '100%',
            backgroundColor: '#f0f2f5',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px',
            mb: 3,
        },
        button: (active: boolean, type: UserType) => ({
            flex: 1,
            py: 1.2,
            borderRadius: '9px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: active
                ? type === 'instrutor' ? '#1565C0' : '#ff6f00'
                : 'transparent',
            color: active ? '#fff' : '#666',
            boxShadow: active ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
            transform: active ? 'scale(1.01)' : 'scale(1)',
        }),
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
            }}
        >
            <ToastContainer position='top-right' autoClose={3000} />
            <Logo />
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>

                {/* Toggle de tipo de usuário */}
                <Box sx={toggleStyles.wrapper}>
                    <Box
                        component="button"
                        onClick={() => setUserType('instrutor')}
                        sx={toggleStyles.button(userType === 'instrutor', 'instrutor')}
                    >
                        <PersonIcon sx={{ fontSize: '1.1rem' }} />
                        Instrutor
                    </Box>
                    <Box
                        component="button"
                        onClick={() => setUserType('aluno')}
                        sx={toggleStyles.button(userType === 'aluno', 'aluno')}
                    >
                        <SchoolIcon sx={{ fontSize: '1.1rem' }} />
                        Aluno
                    </Box>
                </Box>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: userType === 'instrutor' ? '#1565C0' : '#ff6f00',
                                '&:hover': {
                                    backgroundColor: userType === 'instrutor' ? '#0D47A1' : '#da6003',
                                },
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            Entrar como {userType === 'instrutor' ? 'Instrutor' : 'Aluno'}
                        </Button>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box flex={1} height={1} sx={{ borderBottom: '0.7px solid #7F858D' }} />
                            <Typography align="center" component="span" color="#7F858D" sx={{ px: 1 }}>
                                OU
                            </Typography>
                            <Box flex={1} height={1} sx={{ borderBottom: '0.7px solid #7F858D' }} />
                        </Stack>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <GoogleLogin
                                onSuccess={(res) => handleGoogleLogin(res)}
                                onError={() => { toast.error('Erro ao fazer login com o Google.'); }}
                            />
                        </Box>
                    </Stack>
                </Box>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                        Não tem uma conta?{' '}
                        <Link href="#" onClick={handleRegister}>
                            Registre-se
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;