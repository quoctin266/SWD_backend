"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtSeeder = void 0;
const common_1 = require("@nestjs/common");
const area_entity_1 = require("../../module/areas/entities/area.entity");
const court_entity_1 = require("../../module/courts/entities/court.entity");
const court_1 = require("../jsonData/court");
const sport_type_entity_1 = require("../../module/sport-types/entities/sport-type.entity");
class CourtSeeder {
    constructor() {
        this.logger = new common_1.Logger(CourtSeeder.name);
    }
    async run(dataSource) {
        const courtsRepository = dataSource.getRepository(court_entity_1.Court);
        const areasRepository = dataSource.getRepository(area_entity_1.Area);
        const sportTypesRepository = dataSource.getRepository(sport_type_entity_1.SportType);
        const count = (await courtsRepository.find()).length;
        if (count === 0) {
            const areaList = await areasRepository.find();
            const sportTypeList = await sportTypesRepository.find();
            const insertData = court_1.courtData.map((court) => {
                const area = areaList.find((area) => area.name === court.area);
                const sportType = sportTypeList.find((sportType) => sportType.name === court.sportType);
                return {
                    ...court,
                    area,
                    sportType,
                };
            });
            await courtsRepository.insert(insertData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.CourtSeeder = CourtSeeder;
//# sourceMappingURL=07_court.seed.js.map