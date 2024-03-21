import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCourtDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  sportTypeId: number;

  @IsNotEmpty()
  @Type(() => Number)
  areaId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
