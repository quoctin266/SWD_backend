"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSeeder = void 0;
const common_1 = require("@nestjs/common");
const wallet_entity_1 = require("../../module/wallets/entities/wallet.entity");
const club_entity_1 = require("../../module/clubs/entities/club.entity");
const member_entity_1 = require("../../module/members/entities/member.entity");
class WalletSeeder {
    constructor() {
        this.logger = new common_1.Logger(WalletSeeder.name);
    }
    async run(dataSource) {
        const walletsRepository = dataSource.getRepository(wallet_entity_1.Wallet);
        const clubsRepository = dataSource.getRepository(club_entity_1.Club);
        const membersRepository = dataSource.getRepository(member_entity_1.Member);
        const count = (await walletsRepository.find()).length;
        if (count === 0) {
            const allClubsList = await clubsRepository.find();
            const commonClub = allClubsList.find((club) => club.isCommon === true);
            const commonMembersList = await membersRepository.findBy({
                club: commonClub,
            });
            await Promise.all(allClubsList.map(async (club) => {
                const balance = Math.floor(Math.random() * (150 - 50 + 1) + 50);
                return walletsRepository.insert({ balance, club });
            }));
            await Promise.all(commonMembersList.map(async (member) => {
                const balance = Math.floor(Math.random() * (50 - 0 + 1) + 0);
                return walletsRepository.insert({
                    balance,
                    member,
                    club: commonClub,
                });
            }));
            this.logger.log('Run seeding complete');
        }
    }
}
exports.WalletSeeder = WalletSeeder;
//# sourceMappingURL=10_wallet.seed.js.map