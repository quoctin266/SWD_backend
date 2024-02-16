import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [1, 2],
    default: null,
    type: String,
  })
  roles: number[];

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^[A-Z_0-9]+$/, {
    message: 'Name must be uppercase spaced by underscore',
  })
  @ApiProperty({
    example: 'USER_CREATE',
    default: null,
  })
  name: string;

  @ApiProperty({
    example: 'Permission to create a User',
    default: null,
  })
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'api/v1/users',
    default: null,
  })
  @Matches(/^api\/v1/, { message: 'API must starts with api/v1/...' })
  apiPath: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'POST',
    default: null,
  })
  @Matches(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)$/i, {
    message:
      'Method must be GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS',
  })
  method: string;
}
