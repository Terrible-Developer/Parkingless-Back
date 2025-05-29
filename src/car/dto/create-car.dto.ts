import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCarDto {
    @IsNotEmpty()
    placa: string;

    @IsNotEmpty()
    fabricante: string;

    @IsNotEmpty()
    modelo: string;

    @IsNotEmpty()
    cor: string;

    @IsNotEmpty()
    ano: number;

    @IsNotEmpty()
    anoModelo: number;

    @IsNotEmpty()
    ativo: boolean;

    /**
     * Precisamos da id do usuário na rota de adição de carro,
     * e por enquanto, por falta de um jeito melhor, passamos a id junto ao dto,
     * e nos baseamos nisso. Não é o melhor jeito de se fazer, mas no momento, é o que funciona
     */
    propId: number;

    prop?: User;
}
