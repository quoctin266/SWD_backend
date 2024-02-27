import { PartialType } from '@nestjs/swagger';
import { CreateCourtDto } from './create-court.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isAvailable: boolean;
}
