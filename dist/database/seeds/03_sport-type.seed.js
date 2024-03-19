"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportTypeSeeder = void 0;
const sport_type_entity_1 = require("../../module/sport-types/entities/sport-type.entity");
const sportType_1 = require("../jsonData/sportType");
const common_1 = require("@nestjs/common");
class SportTypeSeeder {
    constructor() {
        this.logger = new common_1.Logger(SportTypeSeeder.name);
    }
    async run(dataSource) {
        const sportTypesRepository = dataSource.getRepository(sport_type_entity_1.SportType);
        const count = (await sportTypesRepository.find()).length;
        if (count === 0) {
            await sportTypesRepository.insert(sportType_1.SportTypeData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.SportTypeSeeder = SportTypeSeeder;
//# sourceMappingURL=03_sport-type.seed.js.map