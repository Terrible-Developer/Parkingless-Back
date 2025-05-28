import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    /**
     * Infelizmente, essa verificação de IsBoolean obriga o valor a estar presente, por que se não tem valor, não tem como ser boolean.
     * A solução provisória disso é garantir que todo update passe o valor de ativo. No momento, a lógica não atrapalha, por quê faz sentido
     * um usuário recebendo uma atualização de dados estar ou ser atualizado para ativo.
     */
    @IsBoolean()
    ativo?: boolean;
}
