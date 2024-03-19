import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';
export declare class PermissionsService {
    private readonly permissionRepository;
    private readonly roleRepository;
    constructor(permissionRepository: Repository<Permission>, roleRepository: Repository<Role>);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        name: string;
        description: string;
        apiPath: string;
        method: string;
        roles: Role[];
    } & Permission>;
    findList(roleId?: number): Promise<Permission[]>;
    findOne(id: number): Promise<Permission[]>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<void>;
}
