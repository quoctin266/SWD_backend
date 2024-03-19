"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const openapi = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
const swagger_1 = require("@nestjs/swagger");
class RegisterUserDto extends (0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, [
    'address',
    'phone',
    'dob',
    'roleId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RegisterUserDto = RegisterUserDto;
//# sourceMappingURL=register-user.dto.js.map