import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
@Module({
  imports: [TypeOrmModule.forFeature([Car, User])],
  controllers: [CarController],
  providers: [
    CarService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [TypeOrmModule],
})
export class CarModule {}
