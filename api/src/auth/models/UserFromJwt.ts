export interface UserFromJwt {
    id: string;
    email: string;
    name: string;
    role: 'aluno' | 'instrutor';
}