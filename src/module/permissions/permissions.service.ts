import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const existedPermission: Permission[] =
      await this.permissionRepository.findBy({
        name: createPermissionDto.name,
      });
    if (existedPermission.length !== 0) {
      throw new HttpException('Duplicated permission', HttpStatus.BAD_REQUEST);
    } else {
      const existingRoles = await this.roleRepository.find();
      var roleArr: Role[] = [];
      createPermissionDto.roles.map((role) => {
        existingRoles.map((dbRole) => {
          if (role === dbRole.name) {
            roleArr.push(dbRole);
          }
        });
      });
      const permissionDto = {
        name: createPermissionDto.name,
        description: createPermissionDto.description,
        apiPath: createPermissionDto.apiPath,
        method: createPermissionDto.method.toUpperCase(),
        roles: roleArr,
      };
      const createdPermission =
        await this.permissionRepository.save(permissionDto);
      return createdPermission;
    }
  }

  async findAll() {
    const permissions = await this.permissionRepository.find();
    return permissions;
  }

  async findOne(id: number) {
    const existedPermission = await this.permissionRepository.findBy({
      id: id,
    });
    if (existedPermission.length === 0) {
      throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
    } else {
      return existedPermission;
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    var updatePermission: Permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!updatePermission) {
      throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
    } else {
      var roleArr: Role[] = [];
      if (updatePermissionDto.roles) {
        if (updatePermissionDto.roles.length !== 0) {
          const existingRoles = await this.roleRepository.find();
          updatePermissionDto.roles.map((role) => {
            existingRoles.map((dbRole) => {
              if (role === dbRole.name) {
                roleArr.push(dbRole);
              }
            });
          });
        }
      }
      updatePermission.name =
        updatePermissionDto.name === undefined
          ? updatePermission.name
          : updatePermissionDto.name;
      updatePermission.description =
        updatePermissionDto.description === undefined
          ? updatePermission.description
          : updatePermissionDto.description;
      updatePermission.roles =
        roleArr.length === 0 ? updatePermission.roles : roleArr;
      updatePermission.apiPath =
        updatePermissionDto.apiPath === undefined
          ? updatePermission.apiPath
          : updatePermissionDto.apiPath;
      updatePermission.method =
        updatePermissionDto.method === undefined
          ? updatePermission.method.toUpperCase()
          : updatePermissionDto.method.toUpperCase();
      const updatedPermission =
        await this.permissionRepository.save(updatePermission);
      return updatedPermission;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
