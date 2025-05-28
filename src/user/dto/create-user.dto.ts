import { IsBoolean, IsNotEmpty, IsOptional, Matches, MinLength,  } from 'class-validator';
import { Car } from '../../car/entities/car.entity';
import { IsValidCpf } from '../validator/cpf.validator';
export class CreateUserDto {
    @IsNotEmpty({ message: "Nome inválido" })
    primeiroNome: string;

    @IsNotEmpty({ message: "Sobrenome inválido" })
    sobrenome: string;

    @IsValidCpf()
    cpf: string;

    @IsNotEmpty({ message: "Senha vazia" })
    @MinLength(6, {message: "erro, abaixo do número mínimo de caracteres"})
    senha: string;

    @IsOptional()
    carro?: Car
}
