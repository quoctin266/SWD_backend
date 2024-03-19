"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSeeder = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../module/events/entities/event.entity");
const event_1 = require("../jsonData/event");
const club_entity_1 = require("../../module/clubs/entities/club.entity");
const lodash_1 = __importDefault(require("lodash"));
class EventSeeder {
    constructor() {
        this.logger = new common_1.Logger(EventSeeder.name);
    }
    async run(dataSource) {
        console.log(event_1.eventData.length);
        const eventRepository = dataSource.getRepository(event_entity_1.Event);
        const clubRepository = dataSource.getRepository(club_entity_1.Club);
        const clubsList = await clubRepository.find({ where: { isCommon: false } });
        const count = (await eventRepository.find()).length;
        if (count === 0) {
            const events = event_1.eventData.map((event) => {
                const eventClubs = clubsList.filter((item) => item.sportType.name === event.club);
                return {
                    ...event,
                    club: lodash_1.default.sample(eventClubs),
                };
            });
            await eventRepository.insert(events);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.EventSeeder = EventSeeder;
//# sourceMappingURL=06_event.seed.js.map