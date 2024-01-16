import { Module } from '@nestjs/common';
import { VinSlotsService } from './vin-slots.service';
import { VinSlotsController } from './vin-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinSlot } from './entities/vin-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinSlot])],
  controllers: [VinSlotsController],
  providers: [VinSlotsService],
})
export class VinSlotsModule {}
