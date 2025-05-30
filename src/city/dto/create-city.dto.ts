import { IsNotEmpty } from "class-validator";
import { State } from "src/state/entities/state.entity";

export class CreateCityDto {
	@IsNotEmpty()
	nome: string;

	@IsNotEmpty()
	estado: State;
}
