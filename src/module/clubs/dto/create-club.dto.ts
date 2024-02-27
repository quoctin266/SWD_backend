import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { INVALID_EMAIL } from 'src/util/message';

export class CreateClubDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  sportTypeId: number;
}
