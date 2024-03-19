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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
const role_entity_1 = require("../role/entities/role.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository, roleRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
    }
    async create(createPermissionDto) {
        const existedPermission = await this.permissionRepository.findBy({
            name: createPermissionDto.name,
        });
        if (existedPermission.length !== 0) {
            throw new common_1.HttpException('Duplicated permission', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const roleArr = await this.roleRepository.find({
                where: { id: (0, typeorm_2.In)(createPermissionDto.roles) },
            });
            const permissionDto = {
                name: createPermissionDto.name,
                description: createPermissionDto.description,
                apiPath: createPermissionDto.apiPath,
                method: createPermissionDto.method.toUpperCase(),
                roles: roleArr,
            };
            const createdPermission = await this.permissionRepository.save(permissionDto);
            return createdPermission;
        }
    }
    async findList(roleId) {
        let permissions;
        if (!roleId) {
            permissions = await this.permissionRepository.find();
        }
        else {
            const permissionsRole = await this.permissionRepository
                .createQueryBuilder('permission')
                .leftJoin('permission.roles', 'role')
                .where('role.id=:roleId', { roleId });
            permissions = await permissionsRole.getMany();
        }
        return permissions;
    }
    async findOne(id) {
        const existedPermission = await this.permissionRepository.find({
            where: { id },
            relations: ['roles'],
        });
        if (existedPermission.length === 0) {
            throw new common_1.HttpException('Permission not found', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return existedPermission;
        }
    }
    async update(id, updatePermissionDto) {
        let updatePermission = await this.permissionRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!updatePermission) {
            throw new common_1.HttpException('Permission not found', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            let roleArr = [];
            if (updatePermissionDto.roles !== undefined) {
                roleArr = await this.roleRepository.find({
                    where: { id: (0, typeorm_2.In)(updatePermissionDto.roles) },
                });
            }
            updatePermission = {
                ...updatePermission,
                ...updatePermissionDto,
                roles: roleArr,
            };
            const updatedPermission = await this.permissionRepository.save(updatePermission);
            return updatedPermission;
        }
    }
    async remove(id) {
        await this.permissionRepository.softDelete({ id: id });
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map