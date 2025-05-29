import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { User } from '../user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, User]),
    ConfigModule.forRoot({
      load: [authConfig]
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '60s' }
      })
    })
  ],
  controllers: [CarController],
  providers: [
    CarService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [TypeOrmModule, CarModule],
})
export class CarModule {}
