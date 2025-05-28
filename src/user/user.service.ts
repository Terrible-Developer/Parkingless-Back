import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(userDto: CreateUserDto): Promise<void> {
    /*
     * Cria a conexão com base na fonte de dados desse service,
     * e dá acesso à funções de conexão
     */
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /*
       * Criamos o usuário a partir das informações do dto, e considerando que o usuário automaticamente estará ativo,
       * visto que é um usuário novo
       */
      const user = this.userRepository.create({
        primeiroNome: userDto.primeiroNome,
        sobrenome: userDto.sobrenome,
        cpf: userDto.cpf,
        senha: userDto.senha,
        ativo: true,
      });

      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      /*
       * No caso de a transação possuir erros, revertemos ela
       */
      await queryRunner.rollbackTransaction();
    } finally {
      /*
       * Fecha a conexão ao banco
       */
      queryRunner.release();
    }
  }

  /*
   * Registra um carro ao usuário
   */
  async addCarToUser(car: Car) {
    //TODO adicionar lógica de adição ao banco
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findOneBy({ cpf });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update({id: id}, {
      primeiroNome: updateUserDto.primeiroNome,
      sobrenome: updateUserDto.sobrenome,
      cpf: updateUserDto.cpf,
      senha: updateUserDto.senha,
      ativo: updateUserDto.ativo
    });
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.remove(user);
  }
}
