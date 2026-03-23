export class User {
    id: string;
    nome: string;
    email: string;
    senha_hash?: undefined;
    idade: number;
    login_google: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: 'aluno' | 'instrutor';
}
