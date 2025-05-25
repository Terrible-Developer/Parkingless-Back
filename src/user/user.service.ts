import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

  async create(userDto: CreateUserDto) {
    console.log('DEBUG: ', process.env.DATABASE_NAME);
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

      console.log('DEBUG ', user);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('Erro na transação: ', err);
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
    console.log('DEBUG: ', process.env.DATABASE_NAME);
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    console.log('DEBUG: ', process.env.DATABASE_NAME);
    return this.userRepository.findOneBy({ id });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findOneBy({ cpf });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.remove(user);
  }

  userTest() {
    return 'This is a user Test!';
  }

  userTestSingle(id: number) {
    return `This test returns user #${id}`;
  }
}
