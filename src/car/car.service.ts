import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    private dataSource: DataSource,
  ) {}


  async create(createCarDto: CreateCarDto): Promise<void> {
    /*
     * Cria a conexão com base na fonte de dados desse service,
     * e dá acesso à funções de conexão
     */
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /*
       * Criamos o usuário a partir das informações do dto, e considerando que o usuário automaticamente estará ativo,
       * visto que é um usuário novo
       */
      const car = this.carRepository.create({
        placa: createCarDto.placa,
        fabricante: createCarDto.fabricante,
        modelo: createCarDto.modelo,
        cor: createCarDto.cor,
        ano: createCarDto.ano,
        anoModelo: createCarDto.anoModelo,
        prop: createCarDto.prop,
        ativo: true
      });

      await queryRunner.manager.save(car);

      await queryRunner.commitTransaction();
    } catch (err) {
      /*
       * No caso de a transação possuir erros, revertemos ela
       */
      await queryRunner.rollbackTransaction();
    } finally {
      /*
       * Fecha a conexão ao banco
       */
      queryRunner.release();
    }
  }

  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  findOne(id: number): Promise<Car | null> {
    return this.carRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<UpdateResult> {
    return await this.carRepository.update({ id: id }, {
      placa: updateCarDto.placa,
      cor: updateCarDto.cor,
      ativo: updateCarDto.ativo
    });
  }

  async remove(car: Car) {
		await this.carRepository.remove(car);
  }

	async validatePlateFormat(plate: string): Promise<boolean> {
    if(new RegExp("^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$").test(plate)){
			return true;
		}
		return false;
		/*
		 * Ponto relevante, existem APIs de validação de informações, não só o formato. Seria um conceito interessante, mas aparentemente, a do Paraná é restrita.
		 * Deixo os links aqui para qualquer caso:
		 * API Paraná: https://www.detran.pr.gov.br/Pagina/Frotista
		 * API São Paulo: https://integrador.sp.gov.br/wps/portal/integrador/catalogoApis/API/detran-veiculos
		 */
	}
}
