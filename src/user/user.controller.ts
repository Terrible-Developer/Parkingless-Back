import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * From the looks of it, this is calling the above get, findOne, not this.
   * Maybe because of the prefix, maybe something else, the important thing is that it's not working.
   */
  @Get('test')
  testReturn() {
    return this.userService.userTest();
  }

  @Get('test/:id')
  testSingleReturn(@Param('id') id: string) {
    return this.userService.userTestSingle(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    //return this.userService.remove(+id);
    /*if(await this.userService.findOne(+id)) user => {

      return await this.userService.remove(this.findOne(user));

    }*/
    const user = await this.findOne(+id).then(user => { return user });

    if(user)
      return await this.userService.remove(user);
    return null;
  }
}
