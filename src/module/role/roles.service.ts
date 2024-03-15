import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';
import {
  DUPLICATED_ROLE,
  FAIL_CREATE_ROLE,
  FAIL_LOAD_ROLE,
} from 'src/util/message';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole: Role = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name },
      relations: ['permissions'],
    });
    if (existingRole) {
      throw new BadRequestException(DUPLICATED_ROLE);
    }
    const permissions: Permission[] = await this.permissionsRepository.find();
    const filteredPermissions: Permission[] = permissions.filter((permission) =>
      createRoleDto.permissions.includes(permission.id),
    );
    const createdRole = await this.rolesRepository.insert({
      ...createRoleDto,
      permissions: filteredPermissions,
    });
    if (createdRole) {
      return createdRole;
    } else {
      throw new BadRequestException(FAIL_CREATE_ROLE);
    }
  }

  async findAll() {
    const rolePermissions: Role[] = await this.rolesRepository.find();
    if (rolePermissions.length == 0) {
      throw new NotFoundException(FAIL_LOAD_ROLE);
    }
    return rolePermissions;
  }

  async findOneByName(name: string) {
    const role: Role = await this.rolesRepository
      .createQueryBuilder('role')
      .leftJoin('role.permissions', 'permission')
      .where('role.name=:name', { name })
      .getOne();
    if (!role) {
      throw new NotFoundException(FAIL_LOAD_ROLE);
    }
    return role;
  }

  async findOneById(id: number) {
    const role: Role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    console.log(role);
    if (!role) {
      throw new NotFoundException(FAIL_LOAD_ROLE);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updateRole: Role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!updateRole) {
      throw new NotFoundException(FAIL_LOAD_ROLE);
    } else {
      let filteredPermissions: Permission[] =
        await this.permissionsRepository.find();
      if (updateRoleDto.permissions) {
        filteredPermissions = filteredPermissions.filter((permission) =>
          updateRoleDto.permissions.includes(permission.id),
        );
      }
      const updatedRole: Role = await this.rolesRepository.save({
        ...updateRole,
        ...updateRoleDto,
        permissions: filteredPermissions,
      });
      if (!updateRole) {
        throw new BadRequestException(FAIL_CREATE_ROLE);
      }
      return updatedRole;
    }
  }

  async remove(id: number) {
    await this.rolesRepository.delete({ id });
  }
}
