import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class WalletFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberId?: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  clubId: number;
}
