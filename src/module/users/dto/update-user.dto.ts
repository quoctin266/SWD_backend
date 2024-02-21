import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['email'] as const) {
  @IsOptional()
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  roleId: number;
}
