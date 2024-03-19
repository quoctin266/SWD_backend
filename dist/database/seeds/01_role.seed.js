"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeeder = void 0;
const role_1 = require("../jsonData/role");
const role_entity_1 = require("../../module/role/entities/role.entity");
const common_1 = require("@nestjs/common");
class RoleSeeder {
    constructor() {
        this.logger = new common_1.Logger(RoleSeeder.name);
    }
    async run(dataSource) {
        const roleRepository = dataSource.getRepository(role_entity_1.Role);
        const count = (await roleRepository.find()).length;
        if (count === 0) {
            await roleRepository.insert(role_1.roleData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.RoleSeeder = RoleSeeder;
//# sourceMappingURL=01_role.seed.js.map