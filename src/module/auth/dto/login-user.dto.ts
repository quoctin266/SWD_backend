import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { INVALID_EMAIL } from 'src/util/message';

export class LoginUserDto {
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty()
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456a@' })
  password: string;
}
