import { PartialType } from '@nestjs/swagger';
import { CreateVinSlotDto } from './create-vin-slot.dto';

export class UpdateVinSlotDto extends PartialType(CreateVinSlotDto) {}
