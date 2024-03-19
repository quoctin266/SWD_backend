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
exports.CreatePermissionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePermissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roles: { required: true, type: () => [Object] }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, apiPath: { required: true, type: () => String }, method: { required: true, type: () => String } };
    }
}
exports.CreatePermissionDto = CreatePermissionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        example: ['ADMIN', 'USER'],
        default: null,
        type: String,
    }),
    __metadata("design:type", Array)
], CreatePermissionDto.prototype, "roles", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.Matches)(/^[A-Z_0-9]+$/, {
        message: 'Name must be uppercase spaced by underscore',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'USER_CREATE',
        default: null,
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Permission to create a User',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'api/v1/users',
        default: null,
    }),
    (0, class_validator_1.Matches)(/^api\/v1/, { message: 'API must starts with api/v1/...' }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "apiPath", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'POST',
        default: null,
    }),
    (0, class_validator_1.Matches)(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)$/i, {
        message: 'Method must be GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS',
    }),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "method", void 0);
//# sourceMappingURL=create-permission.dto.js.map