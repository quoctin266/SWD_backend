import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RolesService } from 'src/module/role/roles.service';
import { IUser } from 'src/module/users/dto/users.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private rolesService;
    constructor(configService: ConfigService, rolesService: RolesService);
    validate(payload: IUser): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        permissions: import("../../permissions/entities/permission.entity").Permission[];
    }>;
}
export {};
