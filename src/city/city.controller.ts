import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Public } from 'src/decorators';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Public()
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
		const city = await this.findOne(+id).then((city) => {
			return city;
		});
		if (city)
    	return this.cityService.remove(city);
		return null;
  }
}
