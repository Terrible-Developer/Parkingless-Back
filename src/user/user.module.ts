import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Car } from '../car/entities/car.entity';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../config/auth.config';
import { BcryptService } from '../services/bcrypt.service';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    TypeOrmModule.forFeature([User, Car]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '60s' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserSubscriber,
    BcryptService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
