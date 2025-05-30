import { IsNotEmpty } from "class-validator";

export class CreateStateDto {
	@IsNotEmpty()
	nome: string;

	/*
	 * No futuro, o ideal vai ser ter uma tabela no banco
	 * ou pegar de algum serviço quais são os códigos de área de
	 * cada estado, mas no momento, para o protótipo, uma string
	 * arbitrária já é suficiente
	 */
	@IsNotEmpty()
	codigoArea: number;
}
