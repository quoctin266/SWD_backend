import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class GoogleAuthDto extends OmitType(CreateUserDto, [
  'address',
  'dob',
  'password',
  'phone',
  'roleId',
] as const) {}
