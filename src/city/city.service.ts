import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CityService {
	constructor(
		@InjectRepository(City)
		private cityRepository: Repository<City>,
		private dataSource: DataSource
	) {}

  async create(createCityDto: CreateCityDto) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const state = this.cityRepository.create({
				nome: createCityDto.nome,
				estado: createCityDto.estado
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
		return this.cityRepository.find();
  }

  findOne(id: number) {
		return this.cityRepository.findOneBy({ id });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
		return await this.cityRepository.update({ id: id}, {
			nome: updateCityDto.nome,
			estado: updateCityDto.estado
		});
  }

  async remove(city: City) {
		await this.cityRepository.remove(city);
		
  }
}
