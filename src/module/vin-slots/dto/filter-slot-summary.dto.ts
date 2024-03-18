import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class SummaryFilterDto {
  @IsOptional()
  @IsDateString()
  summaryFrom?: string;

  @IsOptional()
  @IsDateString()
  summaryTo?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  weekly?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current?: number;
}
