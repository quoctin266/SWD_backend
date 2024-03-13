import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @Type(() => Number)
  slotId: number;
}
