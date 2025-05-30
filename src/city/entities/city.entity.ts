import { State } from "src/state/entities/state.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@ManyToOne(() => State, (state) => state.cidade)
	estado: State;
}
