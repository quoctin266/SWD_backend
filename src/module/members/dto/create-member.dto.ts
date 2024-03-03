import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @Type(() => Number)
  clubId: number;

  @IsNotEmpty()
  @Type(() => Number)
  userId: number;
}
