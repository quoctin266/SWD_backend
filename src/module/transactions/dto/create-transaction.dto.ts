import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Type(() => Number)
  applicationId?: number;

  @IsNotEmpty()
  @Type(() => Number)
  senderId: number;

  @IsNotEmpty()
  @Type(() => Number)
  receiverId: number;
}
