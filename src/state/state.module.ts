import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { City } from 'src/city/entities/city.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import authConfig from 'src/config/auth.config';

@Module({
	imports: [
		TypeOrmModule.forFeature([State, City]),
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
  controllers: [StateController],
  providers: [
    StateService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
	exports: [TypeOrmModule, StateService]
})
export class StateModule {}
