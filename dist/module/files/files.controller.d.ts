/// <reference types="multer" />
import { FilesService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(data: UploadFileDto, file: Express.Multer.File): Promise<import("typeorm").ObjectLiteral>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
