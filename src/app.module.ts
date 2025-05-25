import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Car } from './car/entities/car.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'postgres',
      entities: [User, Car],
      logging: true,
      synchronize: true, //Opção que "reincia" o banco ao rodar o app. Uso apenas para desenvolvimento e debugging, e nunca deve ser usada em produção
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
