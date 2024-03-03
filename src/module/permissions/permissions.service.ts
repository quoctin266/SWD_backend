import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
      const roleArr = await this.roleRepository.find({
        where: { id: In(createPermissionDto.roles) },
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

  async findAll(roleId?: number) {
    let permissions: Permission[];
    if (!roleId) {
      permissions = await this.permissionRepository.find();
    } else {
      const permissionsRole = await this.permissionRepository
        .createQueryBuilder('permission')
        .leftJoin('permission.roles', 'role')
        .where('role.id=:roleId', { roleId });
      permissions = await permissionsRole.getMany();
    }
    return permissions;
  }

  async findOne(id: number) {
    const existedPermission: Permission[] =
      await this.permissionRepository.find({
        where: { id },
        relations: ['roles'],
      });
    if (existedPermission.length === 0) {
      throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
    } else {
      return existedPermission;
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const updatePermission: Permission =
      await this.permissionRepository.findOne({
        where: { id },
        relations: ['roles'],
      });
    if (!updatePermission) {
      throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST);
    } else {
      let roleArr: Role[] = [];
      if (updatePermissionDto.roles !== undefined) {
        roleArr = await this.roleRepository.find({
          where: { id: In(updatePermissionDto.roles) },
        });
      }

      updatePermission.roles = roleArr;

      const updatedPermission: Permission =
        await this.permissionRepository.save(updatePermission);

      // Not yet been done.

      // const updatedPermission = await this.permissionRepository.update(
      //   { id: id },
      //   {
      //     name: updatePermissionDto.name,
      //     description: updatePermissionDto.description,
      //     roles: roleArr.length === 0 ? undefined : roleArr,
      //     apiPath: updatePermissionDto.apiPath,
      //     method: updatePermissionDto.method.toUpperCase(),
      //   },
      // );
      return updatedPermission;
    }
  }

  async remove(id: number) {
    await this.permissionRepository.softDelete({ id: id });
  }
}
