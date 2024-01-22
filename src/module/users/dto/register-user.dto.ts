import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { INVALID_EMAIL, INVALID_PASSWORD } from 'src/util/message';

const passwordFormat =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordFormat, {
    message: INVALID_PASSWORD,
  })
  password: string;
}
