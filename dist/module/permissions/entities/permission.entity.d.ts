import { Role } from 'src/module/role/entities/role.entity';
export declare class Permission {
    id: number;
    name: string;
    description: string;
    apiPath: string;
    method: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
