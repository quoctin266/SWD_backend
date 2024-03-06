import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateVinSlotDto } from './create-vin-slot.dto';

class CreateVinSlotDtoWithoutCreatedBy extends OmitType(CreateVinSlotDto, [
  'createdBy',
] as const) {}

export class UpdateVinSlotDto extends PartialType(
  CreateVinSlotDtoWithoutCreatedBy,
) {}
