"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinSlotSeeder = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const vin_slot_entity_1 = require("../../module/vin-slots/entities/vin-slot.entity");
const vinSlots_1 = require("../jsonData/vinSlots");
const court_entity_1 = require("../../module/courts/entities/court.entity");
const member_entity_1 = require("../../module/members/entities/member.entity");
const lodash_1 = __importDefault(require("lodash"));
const club_entity_1 = require("../../module/clubs/entities/club.entity");
class VinSlotSeeder {
    constructor() {
        this.logger = new common_1.Logger(VinSlotSeeder.name);
    }
    async run(dataSource) {
        const vinSlotsRepository = dataSource.getRepository(vin_slot_entity_1.VinSlot);
        const courtsRepository = dataSource.getRepository(court_entity_1.Court);
        const membersRepository = dataSource.getRepository(member_entity_1.Member);
        const clubsRepository = dataSource.getRepository(club_entity_1.Club);
        const count = (await vinSlotsRepository.find()).length;
        if (count === 0) {
            const commonClub = await clubsRepository.findOneBy({ isCommon: true });
            const courtList = await courtsRepository.findBy({ isAvailable: true });
            const memberList = await membersRepository.findBy({
                club: (0, typeorm_1.Not)(commonClub.id),
            });
            const slotTimes = (0, vinSlots_1.generateSlots)();
            const slotsData = slotTimes.map((slot) => {
                const court = lodash_1.default.sample(courtList);
                const createdBy = lodash_1.default.sample(memberList);
                return {
                    ...slot,
                    court,
                    createdBy,
                };
            });
            await vinSlotsRepository.insert(slotsData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.VinSlotSeeder = VinSlotSeeder;
//# sourceMappingURL=09_vinSlot.seed.js.map