import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}

  /**
   * Hasheia uma senha
   * @param password Senha a ser hasheada
   * @description Hasheia a senha usando bcrypt
   * @throws Error se ocorrer um erro ao hashear a senha
   * @returns Senha hasheada
   */
  async hashPassword(password: string): Promise<string> {
    if (!bcrypt) {
      throw new Error('bcrypt is not properly initialized');
    }

    try {
      const saltRounds = Number(
        this.configService.get<number>('bcrypt.saltRounds'),
      );
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(`Failed to hash password: ${error.message}`);
    }
  }

  /**
   *  Compara uma senha com um hash
   * @param password Senha
   * @param hash Senha hasheada (do banco)
   * @returns true se a senha for igual, false caso contrário
   * @throws Error se ocorrer um erro ao comparar as senhas
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      const bcryptError = error as Error;
      throw new Error(
        `Error comparing password: ${bcryptError.message || 'Unknown error occurred'}`,
      );
    }
  }
}
