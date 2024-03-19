/// <reference types="multer" />
export declare class UploadFileDto {
    file: Express.Multer.File;
    folderType: string;
    folderName: string;
}
