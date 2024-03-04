import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class MemberFilterDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isLeader?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  eventId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  clubId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

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
