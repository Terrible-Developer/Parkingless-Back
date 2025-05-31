import { State } from "src/state/entities/state.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@ManyToOne(() => State, (state) => state.cidade)
	estado: State;
}
