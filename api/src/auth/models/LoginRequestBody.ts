import { IsEmail, isString, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  role: 'aluno' | 'instrutor';
}