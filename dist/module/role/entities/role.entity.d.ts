import { Permission } from 'src/module/permissions/entities/permission.entity';
export declare class Role {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    permissions: Permission[];
    createdAt: Date;
    updatedAt: Date;
}
