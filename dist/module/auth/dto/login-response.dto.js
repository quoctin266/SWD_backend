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
exports.SuccessResponse = exports.LoginResponse = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../../users/dto/users.dto");
const message_1 = require("../../../util/message");
class LoginResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, resfreshToken: { required: true, type: () => String }, user: { required: true, type: () => require("../../users/dto/users.dto").IUser } };
    }
}
exports.LoginResponse = LoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], LoginResponse.prototype, "resfreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: users_dto_1.IUser }),
    __metadata("design:type", users_dto_1.IUser)
], LoginResponse.prototype, "user", void 0);
class SuccessResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: true, type: () => String }, data: { required: true, type: () => require("./login-response.dto").LoginResponse } };
    }
}
exports.SuccessResponse = SuccessResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '201' }),
    __metadata("design:type", Number)
], SuccessResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: message_1.LOGIN_SUCCESS }),
    __metadata("design:type", String)
], SuccessResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LoginResponse }),
    __metadata("design:type", LoginResponse)
], SuccessResponse.prototype, "data", void 0);
//# sourceMappingURL=login-response.dto.js.map