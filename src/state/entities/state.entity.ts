import { City } from "src/city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class State {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@Column()
	codigoArea: number;

	@OneToMany(() => City, (city) => city.estado)
	cidade: City;
}
