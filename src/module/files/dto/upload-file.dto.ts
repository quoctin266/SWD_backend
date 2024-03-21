import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file?: Express.Multer.File;

  @IsNotEmpty()
  folderType: string;

  @IsNotEmpty()
  folderName: string;
}
