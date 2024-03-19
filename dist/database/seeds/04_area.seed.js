"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaSeeder = void 0;
const common_1 = require("@nestjs/common");
const area_entity_1 = require("../../module/areas/entities/area.entity");
const area_1 = require("../jsonData/area");
class AreaSeeder {
    constructor() {
        this.logger = new common_1.Logger(AreaSeeder.name);
    }
    async run(dataSource) {
        const areasRepository = dataSource.getRepository(area_entity_1.Area);
        const count = (await areasRepository.find()).length;
        if (count === 0) {
            await areasRepository.insert(area_1.areaData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.AreaSeeder = AreaSeeder;
//# sourceMappingURL=04_area.seed.js.map