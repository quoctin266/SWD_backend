import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourtCountFilterDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  year?: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  top?: number;
}
