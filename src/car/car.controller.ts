import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Public } from 'src/decorators';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Public()
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

	@Public()
	@Post('plateFormat')
	plateFormat(@Body() plate: string) {
		return this.carService.validatePlateFormat(plate);
	}

  @Public()
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
		const car = await this.findOne(+id).then((car) => {
			return car;
		});

		if (car)
			return await this.carService.remove(car);
		return null;
  }
}
