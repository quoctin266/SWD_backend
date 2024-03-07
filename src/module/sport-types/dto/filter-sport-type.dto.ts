import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class SportTypeFilterDto {
  @IsOptional()
  name?: string;

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
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  sortDescending?: boolean;
}
