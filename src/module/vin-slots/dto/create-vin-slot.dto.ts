import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVinSlotDto {
  @ApiProperty({ example: 10, description: 'The capacity of the VIN slot' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({
    example: 'available',
    description: 'The status of the VIN slot',
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The start time of the VIN slot',
  })
  @IsNotEmpty()
  @IsDate()
  beginAt: Date;

  @ApiProperty({
    example: '2022-01-01T01:00:00Z',
    description: 'The end time of the VIN slot',
  })
  @IsNotEmpty()
  @IsDate()
  endAt: Date;

  @ApiProperty({
    example: 1,
    description: 'The ID of the court associated with the VIN slot',
  })
  @IsNotEmpty()
  @IsNumber()
  courtId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who created the VIN slot',
  })
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
