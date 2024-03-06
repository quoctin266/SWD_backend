import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVinSlotDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsDateString()
  beginAt: string;

  @IsNotEmpty()
  @IsDateString()
  endAt: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  courtId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  memberId: number;
}
