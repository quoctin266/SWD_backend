import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import { UploadFileDto } from './dto/upload-file.dto';
import fileValidation from './config/files.validation';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ResponseMessage('Upload file successfully')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() data: UploadFileDto,
    @UploadedFile(fileValidation) file: Express.Multer.File,
  ) {
    return this.filesService.create(data, file);
  }

  @Delete(':id')
  @ResponseMessage('Delete file successfully')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }

  // @Get()
  // findAll() {
  //   return this.filesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }
}
