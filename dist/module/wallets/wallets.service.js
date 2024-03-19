"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("../members/entities/member.entity");
const typeorm_2 = require("@nestjs/typeorm");
const club_entity_1 = require("../clubs/entities/club.entity");
const wallet_entity_1 = require("./entities/wallet.entity");
const message_1 = require("../../util/message");
let WalletsService = class WalletsService {
    constructor(walletsRepository, clubsRepository, membersRepository) {
        this.walletsRepository = walletsRepository;
        this.clubsRepository = clubsRepository;
        this.membersRepository = membersRepository;
    }
    create(createWalletDto) {
        return 'This action adds a new wallet';
    }
    findList() {
        return `This action returns all wallets`;
    }
    async findOne(queryObj) {
        const { memberId, clubId } = queryObj;
        const club = await this.clubsRepository.findOneBy({ id: clubId });
        if (!club)
            throw new common_1.BadRequestException(message_1.NOTFOUND_CLUB);
        const wallet = await this.walletsRepository.findOne({
            relations: {
                member: true,
                club: true,
            },
            where: {
                member: {
                    id: memberId ? memberId : (0, typeorm_1.IsNull)(),
                },
                club: {
                    id: clubId,
                },
            },
        });
        return {
            ...wallet,
            club: wallet.club ? wallet.club.id : null,
            member: wallet.member ? wallet.member.id : null,
        };
    }
    update(id, updateWalletDto) {
        return `This action updates a #${id} wallet`;
    }
    remove(id) {
        return `This action removes a #${id} wallet`;
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(wallet_entity_1.Wallet)),
    __param(1, (0, typeorm_2.InjectRepository)(club_entity_1.Club)),
    __param(2, (0, typeorm_2.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], WalletsService);
//# sourceMappingURL=wallets.service.js.map