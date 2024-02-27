import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { SportType } from '../sport-types/entities/sport-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, SportType])],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
