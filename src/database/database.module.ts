import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { DatabasesService } from './database.service';

@Module({
  imports: [TypeOrmModule.forFeature([SportType])],
  providers: [DatabasesService],
})
export class DatabasesModule {}
