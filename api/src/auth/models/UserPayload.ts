export interface UserPayload {
    sub: string;
    email: string;
    role: 'aluno' | 'instrutor';
    name: string;
    iat?: number;
    exp?: number;
}