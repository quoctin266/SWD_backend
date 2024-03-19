import { Role } from 'src/module/role/entities/role.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    dob: Date;
    isActive: boolean;
    role: Role;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
