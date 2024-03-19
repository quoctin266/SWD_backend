"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubSeeder = void 0;
const common_1 = require("@nestjs/common");
const club_entity_1 = require("../../module/clubs/entities/club.entity");
const sport_type_entity_1 = require("../../module/sport-types/entities/sport-type.entity");
const club_1 = require("../jsonData/club");
class ClubSeeder {
    constructor() {
        this.logger = new common_1.Logger(ClubSeeder.name);
    }
    async run(dataSource) {
        const clubRepository = dataSource.getRepository(club_entity_1.Club);
        const sportTypeRepository = dataSource.getRepository(sport_type_entity_1.SportType);
        const count = (await clubRepository.find()).length;
        if (count === 0) {
            await clubRepository.insert({
                name: 'Common',
                email: 'common@gmail.com',
                description: 'Common club for all users',
                isCommon: true,
            });
            const football = await sportTypeRepository.findOneBy({
                name: 'Football',
            });
            club_1.footballClubData.forEach((club) => {
                club.sportType = football;
            });
            const basketball = await sportTypeRepository.findOneBy({
                name: 'Basketball',
            });
            club_1.basketballClubData.forEach((club) => {
                club.sportType = basketball;
            });
            const badminton = await sportTypeRepository.findOneBy({
                name: 'Badminton',
            });
            club_1.badmintonClubData.forEach((club) => {
                club.sportType = badminton;
            });
            const tennis = await sportTypeRepository.findOneBy({ name: 'Tennis' });
            club_1.tennisClubData.forEach((club) => {
                club.sportType = tennis;
            });
            const volleyball = await sportTypeRepository.findOneBy({
                name: 'Volleyball',
            });
            club_1.volleyballClubData.forEach((club) => {
                club.sportType = volleyball;
            });
            await clubRepository.insert([
                ...club_1.footballClubData,
                ...club_1.basketballClubData,
                ...club_1.badmintonClubData,
                ...club_1.tennisClubData,
                ...club_1.volleyballClubData,
            ]);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.ClubSeeder = ClubSeeder;
//# sourceMappingURL=05_club.seed.js.map