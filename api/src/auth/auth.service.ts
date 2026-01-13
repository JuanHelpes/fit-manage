import { Injectable } from '@nestjs/common';
import { AlunoService } from 'src/users/aluno/aluno.service';
import { InstrutorService } from 'src/users/instrutor/instrutor.service';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService  {
  constructor(private readonly alunoService: AlunoService, private readonly instrutorService: InstrutorService, private readonly jwtService : JwtService) {}

  login(user: User): UserToken {
    // Transforma o user em um JWT token

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.nome,
    }

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken, };

    throw new Error('Method not implemented.');
  }

  async validateUser(email: string, password: string, role: 'aluno' | 'instrutor') {
      if (role === 'aluno') {
        const user = await this.alunoService.findByEmail(email);

        if(user){
          const isPasswordValid = await bcrypt.compare(password, user.senha_hash);

          if (isPasswordValid) {
            return {
              ...user,
              senha_hash: undefined,
              role: 'aluno',
            }
          }

        }
      }
      if (role === 'instrutor') {
        // Implementar a lógica de autenticação para instrutor
      }

      throw new Error('Email address or password provided is incorrect.');
  }


}