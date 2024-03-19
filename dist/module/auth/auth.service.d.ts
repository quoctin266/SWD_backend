import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { IUser } from '../users/dto/users.dto';
import { GoogleAuthDto } from '../users/dto/google-auth.dto';
import { RolesService } from '../role/roles.service';
import { IGoogleUser } from './passport/google.strategy';
export declare class AuthService {
    private usersService;
    private rolesService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, rolesService: RolesService, jwtService: JwtService, configService: ConfigService);
    createRefreshToken(): string;
    validateUser(email: string, pass: string): Promise<IUser>;
    login(user: IUser): Promise<LoginResponse>;
    googleAuth(googleAuthDto: GoogleAuthDto): Promise<LoginResponse>;
    googleAuthServer(user: IGoogleUser): Promise<LoginResponse>;
    processNewToken(refreshToken: string): Promise<LoginResponse>;
    clearToken(user: IUser): Promise<any>;
}
