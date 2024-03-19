/// <reference types="multer" />
import { UploadFileDto } from './dto/upload-file.dto';
import AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private filesRepository;
    private configService;
    constructor(filesRepository: Repository<File>, configService: ConfigService);
    createFileName: (originalName: string) => string;
    uploadAWS(data: UploadFileDto, file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData>;
    create(data: UploadFileDto, file: Express.Multer.File): Promise<import("typeorm").ObjectLiteral>;
    removeFileAWS: (key: string) => Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.DeleteObjectOutput, AWS.AWSError>>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
