import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateFilterDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  memberId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isDislike?: boolean;
}
