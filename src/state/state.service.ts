import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
	constructor(
		@InjectRepository(State)
		private stateRepository: Repository<State>,
		private dataSource: DataSource
	) {}

  async create(createStateDto: CreateStateDto): Promise<void> {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const state = this.stateRepository.create({
				nome: createStateDto.nome,
				codigoArea: createStateDto.codigoArea
			});
			await queryRunner.manager.save(state);
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			queryRunner.release();
		}

  }

  findAll() {
		return this.stateRepository.find();
  }

  findOne(id: number) {
		return this.stateRepository.findOneBy({ id });
  }

  findByAreaCode(codigoArea: number) {
		return this.stateRepository.findOneBy({ codigoArea });
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
		return await this.stateRepository.update({ id: id}, {
			nome: updateStateDto.nome,
			codigoArea: updateStateDto.codigoArea
		});
  }

  async remove(state: State): Promise<void> {
		await this.stateRepository.remove(state);
  }
}
