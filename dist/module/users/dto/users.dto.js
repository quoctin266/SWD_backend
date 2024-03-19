"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUser = void 0;
const openapi = require("@nestjs/swagger");
class IUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number, example: 1 }, username: { required: true, type: () => String, example: "user" }, email: { required: true, type: () => String, example: "user@gmail.com" }, role: { required: true, type: () => String, example: "USER" } };
    }
}
exports.IUser = IUser;
//# sourceMappingURL=users.dto.js.map