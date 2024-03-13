import { IsNotEmpty } from 'class-validator';

export class UpdateApplicationDto {
  @IsNotEmpty()
  status: string;
}
