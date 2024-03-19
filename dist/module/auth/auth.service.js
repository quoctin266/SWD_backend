"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const roles_service_1 = require("../role/roles.service");
let AuthService = class AuthService {
    constructor(usersService, rolesService, jwtService, configService) {
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    createRefreshToken() {
        const payload = {
            sub: 'refresh token',
            iss: 'from nest server',
        };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_KEY'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
        });
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            const checkPW = await this.usersService.checkPassword(user.password, pass);
            if (checkPW === true) {
                const result = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role.name,
                };
                return result;
            }
        }
        return null;
    }
    async login(user) {
        const { id, username, email, role } = user;
        const payload = {
            sub: 'login token',
            iss: 'from nest server',
            id,
            username,
            email,
            role,
        };
        const resfreshToken = this.createRefreshToken();
        await this.usersService.updateUserToken(resfreshToken, id);
        return {
            accessToken: this.jwtService.sign(payload),
            resfreshToken,
            user: {
                id,
                username,
                email,
                role,
            },
        };
    }
    async googleAuth(googleAuthDto) {
        const { username, email } = googleAuthDto;
        const userExist = await this.usersService.findOneByEmail(email);
        if (!userExist) {
            const roleId = (await this.rolesService.findOneByName('USER')).id;
            const password = await (0, users_service_1.hashPassword)('123456a@');
            await this.usersService.create({ email, username, roleId, password });
        }
        const user = await this.usersService.findOneByEmail(email);
        const payload = {
            sub: 'google login token',
            iss: 'from nest server',
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name,
        };
        const resfreshToken = this.createRefreshToken();
        await this.usersService.updateUserToken(resfreshToken, user.id);
        return {
            accessToken: this.jwtService.sign(payload),
            resfreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role.name,
            },
        };
    }
    googleAuthServer(user) {
        if (!user)
            return null;
        const { email, firstName, lastName } = user;
        return this.googleAuth({ email, username: firstName + lastName });
    }
    async processNewToken(refreshToken) {
        try {
            this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_TOKEN_KEY'),
            });
            const user = await this.usersService.findOneByToken(refreshToken);
            if (!user)
                throw new common_1.BadRequestException('Invalid refresh token');
            const { id, username, email, role } = user;
            return await this.login({ id, username, email, role: role.name });
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid refresh token');
        }
    }
    async clearToken(user) {
        await this.usersService.updateUserToken('', user.id);
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        roles_service_1.RolesService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map