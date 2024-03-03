import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class EventFilterDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  clubId?: number;

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
