import { ApiProperty } from '@nestjs/swagger';
import { LOGOUT_SUCCESS } from 'src/util/message';

export class LogoutResponse {
  @ApiProperty({ example: '201' })
  statusCode: number;

  @ApiProperty({ example: LOGOUT_SUCCESS })
  message: string;

  @ApiProperty({ type: 'string', default: null })
  data: string;
}
