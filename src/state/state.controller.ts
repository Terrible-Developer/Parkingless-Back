import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Public } from 'src/decorators';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Public()
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const state = await this.findOne(+id).then((state) => {
      return state;
    });

    if (state)
    	return this.stateService.remove(state);
		return null;
  }
}
