import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        name: string;
        description: string;
        apiPath: string;
        method: string;
        roles: import("../role/entities/role.entity").Role[];
    } & import("./entities/permission.entity").Permission>;
    findList(roleId?: string): Promise<import("./entities/permission.entity").Permission[]>;
    findOne(id: number): Promise<import("./entities/permission.entity").Permission[]>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<import("./entities/permission.entity").Permission>;
    remove(id: string): Promise<void>;
}
