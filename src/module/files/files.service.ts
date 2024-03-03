import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import AWS from 'aws-sdk';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private configService: ConfigService,
  ) {}

  createFileName = (originalName: string) => {
    const extName = path.extname(originalName);
    const baseName = path.basename(originalName, extName);

    const fileName = baseName + '_' + new Date().getTime() + extName;

    return fileName;
  };

  async uploadAWS(data: UploadFileDto, file: Express.Multer.File) {
    const { folderType, folderName } = data;

    const s3 = new AWS.S3();

    const fileContent = file.buffer;
    const fileName = this.createFileName(file.originalname);
    const BUCKET = this.configService.get<string>('BUCKET');

    return await s3
      .upload({
        Body: fileContent,
        Bucket: BUCKET,
        Key: `${folderType}/${folderName}/${fileName}`,
      })
      .promise();
  }

  async create(data: UploadFileDto, file: Express.Multer.File) {
    const res = await this.uploadAWS(data, file);

    const { Location, Key } = res;

    const result = await this.filesRepository.insert({
      url: Location,
      key: Key,
    });

    return result.generatedMaps[0];
  }

  removeFileAWS = async (key: string) => {
    const s3 = new AWS.S3();

    const BUCKET = this.configService.get<string>('BUCKET');

    const params = {
      Bucket: BUCKET,
      Key: key,
    };

    try {
      // check file exist
      await s3.headObject(params).promise();

      return await s3.deleteObject(params).promise();
    } catch (error) {
      console.log('>>> Check AWS error', error);

      return null;
    }
  };

  async remove(id: number) {
    const file = await this.filesRepository.findOneBy({ id });
    if (!file) throw new NotFoundException('File not found');

    await this.removeFileAWS(file.key);

    return this.filesRepository.softDelete(id);
  }

  // create(createFileDto: CreateFileDto) {
  //   return 'This action adds a new file';
  // }
  // findList() {
  //   return `This action returns all files`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }
  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
