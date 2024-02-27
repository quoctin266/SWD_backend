import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CourtFilterDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sportTypeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  areaId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortDescending?: boolean;
}
