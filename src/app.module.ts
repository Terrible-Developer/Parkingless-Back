import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Car } from './car/entities/car.entity';
import { CarModule } from './car/car.module';
import { State } from './state/entities/state.entity';
import { StateModule } from './state/state.module';
import { City } from './city/entities/city.entity';
import { CityModule } from './city/city.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    CarModule,
    AuthModule,
    StateModule,
    CityModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'Parkingless',
      entities: [User, Car, State, City],
      logging: true,
      synchronize: true, //Opção que sincroniza o banco, criando relações não existentes e similares. Usado apenas para desenvolvimento, deve ser desligado para produção
    }),
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
