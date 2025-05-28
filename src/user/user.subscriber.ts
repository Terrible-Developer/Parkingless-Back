import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from '../services/bcrypt.service';

/**
 * Subscriber para a entity User que faz o hash da senha antes de inserir um novo usuário.
 */
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    dataSource: DataSource,
    private readonly bcryptService: BcryptService,
  ) {
    dataSource.subscribers.push(this);
  }

  async beforeInsert(event: InsertEvent<User>) {
    console.log("DEBUG: testando update de senha | ", event.entity.senha);
    if (event.entity.senha) {
      try {
        event.entity.senha = await this.bcryptService.hashPassword(
          event.entity.senha,
        );
      } catch (error) {
        console.error('Hash error:', error);
        throw error;
      }
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity!.senha) {
      try {
        event.entity!.senha = await this.bcryptService.hashPassword(
          event.entity!.senha,
        );
      } catch (error) {
        console.error('Hash error:', error);
        throw error;
      }
    }
  }

}
