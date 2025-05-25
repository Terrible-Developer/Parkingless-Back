import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../services/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async signIn(cpf: string, _senha: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByCpf(cpf);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await this.bcryptService.comparePassword(_senha, user.senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, cpf: user.cpf };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
