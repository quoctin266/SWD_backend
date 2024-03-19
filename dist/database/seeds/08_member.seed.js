"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeberSeeder = void 0;
const common_1 = require("@nestjs/common");
const club_entity_1 = require("../../module/clubs/entities/club.entity");
const user_entity_1 = require("../../module/users/entities/user.entity");
const member_entity_1 = require("../../module/members/entities/member.entity");
const lodash_1 = __importDefault(require("lodash"));
class MemeberSeeder {
    constructor() {
        this.logger = new common_1.Logger(MemeberSeeder.name);
    }
    async run(dataSource) {
        const clubsRepository = dataSource.getRepository(club_entity_1.Club);
        const usersRepository = dataSource.getRepository(user_entity_1.User);
        const membersRepository = dataSource.getRepository(member_entity_1.Member);
        const count = (await membersRepository.find()).length;
        if (count === 0) {
            const clubList = await clubsRepository.find();
            const usersList = await usersRepository.find();
            await Promise.all(clubList.map(async (club) => {
                if (club.isCommon) {
                    return usersList.map(async (user) => {
                        return membersRepository.insert({ club, user });
                    });
                }
                const clubLeader = lodash_1.default.sample(usersList);
                membersRepository.insert({ isLeader: true, club, user: clubLeader });
                const randomUsers = lodash_1.default.sampleSize(usersList, 20);
                return randomUsers.map(async (user) => {
                    if (user.id !== clubLeader.id)
                        return membersRepository.insert({ club, user });
                });
            }));
            this.logger.log('Run seeding complete');
        }
    }
}
exports.MemeberSeeder = MemeberSeeder;
//# sourceMappingURL=08_member.seed.js.map