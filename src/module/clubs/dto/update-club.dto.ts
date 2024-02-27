import { OmitType } from '@nestjs/swagger';
import { CreateClubDto } from './create-club.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateClubDto extends OmitType(CreateClubDto, [
  'email',
  'sportTypeId',
] as const) {
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive: boolean;
}
