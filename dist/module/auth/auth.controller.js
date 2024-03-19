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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const customize_1 = require("../../decorator/customize");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const local_auth_guard_1 = require("./guard/local-auth.guard");
const register_user_dto_1 = require("../users/dto/register-user.dto");
const login_response_dto_1 = require("./dto/login-response.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const message_1 = require("../../util/message");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const users_dto_1 = require("../users/dto/users.dto");
const logout_response_dto_1 = require("./dto/logout-response.dto");
const google_auth_dto_1 = require("../users/dto/google-auth.dto");
const google_oauth_guard_1 = require("./guard/google-oauth.guard");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    login(user, response) {
        return this.authService.login(user);
    }
    register(registerUserDTO) {
        return this.usersService.registerUser(registerUserDTO);
    }
    googleAuth(googleAuthDto) {
        return this.authService.googleAuth(googleAuthDto);
    }
    googleAuthServer(req) { }
    googleAuthRedirect(req) {
        return this.authService.googleAuthServer(req.user);
    }
    refreshToken(refreshToken) {
        return this.authService.processNewToken(refreshToken);
    }
    logout(user) {
        return this.authService.clearToken(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('login'),
    (0, customize_1.ResponseMessage)(message_1.LOGIN_SUCCESS),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: login_response_dto_1.SuccessResponse,
    }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    openapi.ApiResponse({ status: 201, type: require("./dto/login-response.dto").LoginResponse }),
    __param(0, (0, customize_1.User)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.IUser, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('register'),
    (0, customize_1.ResponseMessage)(message_1.REGISTER_SUCCESS),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('google-auth'),
    (0, customize_1.ResponseMessage)(message_1.LOGIN_SUCCESS),
    openapi.ApiResponse({ status: 201, type: require("./dto/login-response.dto").LoginResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_auth_dto_1.GoogleAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)('google-auth-server'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthServer", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)('google-redirect'),
    (0, customize_1.ResponseMessage)(message_1.LOGIN_SUCCESS),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./dto/login-response.dto").LoginResponse }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, customize_1.ResponseMessage)(message_1.GET_NEW_TOKEN),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDto }),
    openapi.ApiResponse({ status: 201, type: require("./dto/login-response.dto").LoginResponse }),
    __param(0, (0, common_1.Body)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, customize_1.ResponseMessage)(message_1.LOGOUT_SUCCESS),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: logout_response_dto_1.LogoutResponse,
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.IUser]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_2.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map