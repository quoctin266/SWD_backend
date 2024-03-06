import { OmitType } from '@nestjs/swagger';
import { CreateVinSlotDto } from './create-vin-slot.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateVinSlotDto extends OmitType(CreateVinSlotDto, [
  'memberId',
] as const) {
  @IsNotEmpty()
  status: string;
}
