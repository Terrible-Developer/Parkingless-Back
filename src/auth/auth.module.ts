import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from '../config/auth.config';
import { BcryptService } from '../services/bcrypt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    BcryptService,
    AuthService,
    ConfigService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, BcryptService],
})
export class AuthModule {}
