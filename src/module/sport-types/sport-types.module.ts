import { Module } from '@nestjs/common';
import { SportTypesService } from './sport-types.service';
import { SportTypesController } from './sport-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportType } from './entities/sport-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportType])],
  controllers: [SportTypesController],
  providers: [SportTypesService],
})
export class SportTypesModule {}
