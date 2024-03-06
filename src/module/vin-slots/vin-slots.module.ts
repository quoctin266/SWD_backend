import { Module } from '@nestjs/common';
import { VinSlotsService } from './vin-slots.service';
import { VinSlotsController } from './vin-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinSlot } from './entities/vin-slot.entity';
import { Member } from '../members/entities/member.entity';
import { Court } from '../courts/entities/court.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinSlot, Member, Court])],
  controllers: [VinSlotsController],
  providers: [VinSlotsService],
})
export class VinSlotsModule {}
