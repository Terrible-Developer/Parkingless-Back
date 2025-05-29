import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    placa: string;

    @Column()
    fabricante: string;

    @Column()
    modelo: string;

    @Column()
    cor: string;

    @Column()
    ano: number;

    @Column()
    anoModelo: number;

    @Column({ default: true })
    ativo: boolean;

    @ManyToOne(() => User, (user) => user.id)
    prop: User;

}
