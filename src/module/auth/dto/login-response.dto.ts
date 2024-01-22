import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/module/users/dto/users.dto';
import { LOGIN_SUCCESS } from 'src/util/message';

export class LoginResponse {
  @ApiProperty({ example: 'string' })
  accessToken: string;

  @ApiProperty({ example: 'string' })
  resfreshToken: string;

  @ApiProperty({ type: IUser })
  user: IUser;
}

export class SuccessResponse {
  @ApiProperty({ example: '201' })
  statusCode: number;

  @ApiProperty({ example: LOGIN_SUCCESS })
  message: string;

  @ApiProperty({ type: LoginResponse })
  data: LoginResponse;
}
