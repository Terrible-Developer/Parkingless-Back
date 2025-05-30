import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { City } from 'src/city/entities/city.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([State, City])
	],
  controllers: [StateController],
  providers: [StateService],
	exports: [TypeOrmModule, StateService]
})
export class StateModule {}
