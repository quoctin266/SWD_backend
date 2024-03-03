import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsDateString()
  registrationDeadline: string;

  @IsNotEmpty()
  @Type(() => Number)
  clubId: number;
}
