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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../permissions/entities/permission.entity");
const message_1 = require("../../util/message");
let RolesService = class RolesService {
    constructor(rolesRepository, permissionsRepository) {
        this.rolesRepository = rolesRepository;
        this.permissionsRepository = permissionsRepository;
    }
    async create(createRoleDto) {
        const existingRole = await this.rolesRepository.findOne({
            where: { name: createRoleDto.name },
            relations: ['permissions'],
        });
        if (existingRole) {
            throw new common_1.BadRequestException(message_1.DUPLICATED_ROLE);
        }
        const permissions = await this.permissionsRepository.find();
        const filteredPermissions = permissions.filter((permission) => createRoleDto.permissions.includes(permission.id));
        const createdRole = await this.rolesRepository.insert({
            ...createRoleDto,
            permissions: filteredPermissions,
        });
        if (createdRole) {
            return createdRole;
        }
        else {
            throw new common_1.BadRequestException(message_1.FAIL_CREATE_ROLE);
        }
    }
    async findList() {
        const rolePermissions = await this.rolesRepository.find();
        if (rolePermissions.length == 0) {
            throw new common_1.NotFoundException(message_1.FAIL_LOAD_ROLE);
        }
        return rolePermissions;
    }
    async findOneByName(name) {
        const role = await this.rolesRepository
            .createQueryBuilder('role')
            .leftJoin('role.permissions', 'permission')
            .where('role.name=:name', { name })
            .getOne();
        if (!role) {
            throw new common_1.NotFoundException(message_1.FAIL_LOAD_ROLE);
        }
        return role;
    }
    async findOneById(id) {
        const role = await this.rolesRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        console.log(role);
        if (!role) {
            throw new common_1.NotFoundException(message_1.FAIL_LOAD_ROLE);
        }
        return role;
    }
    async update(id, updateRoleDto) {
        const updateRole = await this.rolesRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!updateRole) {
            throw new common_1.NotFoundException(message_1.FAIL_LOAD_ROLE);
        }
        else {
            let filteredPermissions = await this.permissionsRepository.find();
            if (updateRoleDto.permissions) {
                filteredPermissions = filteredPermissions.filter((permission) => updateRoleDto.permissions.includes(permission.id));
            }
            const updatedRole = await this.rolesRepository.save({
                ...updateRole,
                ...updateRoleDto,
                permissions: filteredPermissions,
            });
            if (!updateRole) {
                throw new common_1.BadRequestException(message_1.FAIL_CREATE_ROLE);
            }
            return updatedRole;
        }
    }
    async remove(id) {
        await this.rolesRepository.delete({ id });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map