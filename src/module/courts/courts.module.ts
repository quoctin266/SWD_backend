import { Module } from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { SportType } from '../sport-types/entities/sport-type.entity';
import { Area } from '../areas/entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Court, SportType, Area])],
  controllers: [CourtsController],
  providers: [CourtsService],
})
export class CourtsModule {}
