import { OmitType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsArray, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateEventDto extends OmitType(CreateEventDto, [
  'clubId',
] as const) {
  @IsOptional()
  status: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  memberIds: number[];

  @IsOptional()
  name: string;

  @IsOptional()
  location: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsDateString()
  registrationDeadline: string;
}
