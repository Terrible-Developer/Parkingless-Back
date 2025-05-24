import { Car } from '../../car/entities/car.entity';
export class CreateUserDto {
    //id: number;
    primeiroNome: string;
    sobrenome: string;
    cpf: string;
    senha: string;
    ativo: boolean;
    carro?: Car
}
