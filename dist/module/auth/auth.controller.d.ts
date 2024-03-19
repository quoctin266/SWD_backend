import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { IUser } from '../users/dto/users.dto';
import { GoogleAuthDto } from '../users/dto/google-auth.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(user: IUser, response: Response): Promise<import("./dto/login-response.dto").LoginResponse>;
    register(registerUserDTO: RegisterUserDto): Promise<import("typeorm").ObjectLiteral>;
    googleAuth(googleAuthDto: GoogleAuthDto): Promise<import("./dto/login-response.dto").LoginResponse>;
    googleAuthServer(req: Request): void;
    googleAuthRedirect(req: Request): Promise<import("./dto/login-response.dto").LoginResponse>;
    refreshToken(refreshToken: string): Promise<import("./dto/login-response.dto").LoginResponse>;
    logout(user: IUser): Promise<any>;
}
