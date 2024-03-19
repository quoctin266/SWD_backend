import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';
export declare class RolesService {
    private rolesRepository;
    private permissionsRepository;
    constructor(rolesRepository: Repository<Role>, permissionsRepository: Repository<Permission>);
    create(createRoleDto: CreateRoleDto): Promise<import("typeorm").InsertResult>;
    findList(): Promise<Role[]>;
    findOneByName(name: string): Promise<Role>;
    findOneById(id: number): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<void>;
}
