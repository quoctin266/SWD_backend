"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const path_1 = __importDefault(require("path"));
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const typeorm_2 = require("typeorm");
let FilesService = class FilesService {
    constructor(filesRepository, configService) {
        this.filesRepository = filesRepository;
        this.configService = configService;
        this.createFileName = (originalName) => {
            const extName = path_1.default.extname(originalName);
            const baseName = path_1.default.basename(originalName, extName);
            const fileName = baseName + '_' + new Date().getTime() + extName;
            return fileName;
        };
        this.removeFileAWS = async (key) => {
            const s3 = new aws_sdk_1.default.S3();
            const BUCKET = this.configService.get('BUCKET');
            const params = {
                Bucket: BUCKET,
                Key: key,
            };
            try {
                await s3.headObject(params).promise();
                return await s3.deleteObject(params).promise();
            }
            catch (error) {
                console.log('>>> Check AWS error', error);
                return null;
            }
        };
    }
    async uploadAWS(data, file) {
        const { folderType, folderName } = data;
        const s3 = new aws_sdk_1.default.S3();
        const fileContent = file.buffer;
        const fileName = this.createFileName(file.originalname);
        const BUCKET = this.configService.get('BUCKET');
        return await s3
            .upload({
            Body: fileContent,
            Bucket: BUCKET,
            Key: `${folderType}/${folderName}/${fileName}`,
        })
            .promise();
    }
    async create(data, file) {
        const res = await this.uploadAWS(data, file);
        const { Location, Key } = res;
        const result = await this.filesRepository.insert({
            url: Location,
            key: Key,
        });
        return result.generatedMaps[0];
    }
    async remove(id) {
        const file = await this.filesRepository.findOneBy({ id });
        if (!file)
            throw new common_1.NotFoundException('File not found');
        await this.removeFileAWS(file.key);
        return this.filesRepository.softDelete(id);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map