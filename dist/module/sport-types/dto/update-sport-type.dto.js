"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSportTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_sport_type_dto_1 = require("./create-sport-type.dto");
class UpdateSportTypeDto extends (0, swagger_1.PartialType)(create_sport_type_dto_1.CreateSportTypeDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSportTypeDto = UpdateSportTypeDto;
//# sourceMappingURL=update-sport-type.dto.js.map