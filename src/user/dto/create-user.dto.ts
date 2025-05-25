import { IsBoolean, IsNotEmpty, IsOptional, Matches, MinLength,  } from 'class-validator';
import { Car } from '../../car/entities/car.entity';
import { IsValidCpf } from '../validator/cpf.validator';
export class CreateUserDto {
    //id: number;
    @IsNotEmpty({ message: "Nome inválido" })
    primeiroNome: string;

    @IsNotEmpty({ message: "Sobrenome inválido" })
    sobrenome: string;

    //@Matches(new RegExp("^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$"), { message: "CPF Inválido" })
    @IsValidCpf({ message: "CPF Inválido" })
    cpf: string;

    @IsNotEmpty({ message: "Senha vazia" })
    @MinLength(6, {message: "erro, abaixo do número mínimo de caracteres"})
    senha: string;

    /*@IsBoolean({ message: 'ativo não é boolean?' })
    ativo: boolean;*/

    @IsOptional()
    carro?: Car
}
