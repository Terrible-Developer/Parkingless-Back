import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { Car } from '../../car/entities/car.entity';

@Entity()
@Unique(["cpf"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    primeiroNome: string;

    @Column()
    sobrenome: string;

    @Column()
    cpf: string;

    @Column()
    senha: string;

    @Column({ default: true })
    ativo: boolean;

    @OneToMany(() => Car, (car) => car.prop)
    carro: Car;
}
