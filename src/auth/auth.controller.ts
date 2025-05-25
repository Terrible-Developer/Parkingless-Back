import {
  Get,
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.cpf, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
