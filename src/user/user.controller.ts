import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../decorators';
import { CreateCarDto } from 'src/car/dto/create-car.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('addCar')
  async addCar(@Body() createCarDto: CreateCarDto) {
		return this.userService.addCarToUser(createCarDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.findOne(+id).then((user) => {
      if(user){
        return this.userService.update(+id, updateUserDto);
      }
      return null;
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    //return this.userService.remove(+id);
    /*if(await this.userService.findOne(+id)) user => {

      return await this.userService.remove(this.findOne(user));

    }*/
    const user = await this.findOne(+id).then((user) => {
      return user;
    });

    if (user)
      return await this.userService.remove(user);
    return null;
  }
}
