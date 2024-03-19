import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("typeorm").InsertResult>;
    findList(): Promise<import("./entities/role.entity").Role[]>;
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./entities/role.entity").Role>;
    remove(id: string): Promise<void>;
}
