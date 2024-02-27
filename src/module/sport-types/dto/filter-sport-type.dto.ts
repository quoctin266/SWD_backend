import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

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
  sortDescending?: boolean;
}
