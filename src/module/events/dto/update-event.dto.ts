import { OmitType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateEventDto extends OmitType(CreateEventDto, [
  'clubId',
] as const) {
  @IsNotEmpty()
  status: string;
}
