"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
class GoogleAuthDto extends (0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, [
    'address',
    'dob',
    'password',
    'phone',
    'roleId',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.GoogleAuthDto = GoogleAuthDto;
//# sourceMappingURL=google-auth.dto.js.map