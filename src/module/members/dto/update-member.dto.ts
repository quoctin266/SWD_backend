import { OmitType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMemberDto extends OmitType(CreateMemberDto, [
  'clubId',
  'userId',
] as const) {
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isLeader: boolean;
}
