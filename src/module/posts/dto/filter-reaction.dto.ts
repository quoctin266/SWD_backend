import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ReactionFilterDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  memberId: number;
}
