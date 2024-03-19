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
exports.ClubsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("./entities/club.entity");
const message_1 = require("../../util/message");
const sport_type_entity_1 = require("../sport-types/entities/sport-type.entity");
let ClubsService = class ClubsService {
    constructor(clubsRepository, sportTypesRepository) {
        this.clubsRepository = clubsRepository;
        this.sportTypesRepository = sportTypesRepository;
    }
    async create(createClubDto) {
        const { name, email, sportTypeId } = createClubDto;
        const existClub = await this.clubsRepository.exists({
            where: [{ name }, { email }],
        });
        if (existClub)
            throw new common_1.BadRequestException(message_1.CONFLICT_CLUB);
        const existType = await this.sportTypesRepository.existsBy({
            id: sportTypeId,
        });
        if (!existType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        const sportType = await this.sportTypesRepository.findOneBy({
            id: sportTypeId,
        });
        const result = await this.clubsRepository.insert({
            ...createClubDto,
            sportType,
        });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { name, email, isActive, sportTypeId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.clubsRepository
            .createQueryBuilder('club')
            .leftJoin('club.sportType', 'sportType')
            .select(['sportType.name', 'club']);
        if (name)
            query.andWhere('club.name ILike :name', { name: `%${name}%` });
        if (email)
            query.andWhere('club.email ILike :email', { email: `%${email}%` });
        if (typeof isActive === 'boolean')
            query.andWhere('club.isActive = :isActive', { isActive });
        if (sportTypeId)
            query
                .addSelect('sportType.id')
                .andWhere('sportType.id =:id', { id: sportTypeId });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['name'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `club.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((club) => {
            return {
                ...club,
                sportType: club.sportType?.name,
            };
        });
        return {
            currentPage: defaultPage,
            totalPages: totalPages,
            pageSize: defaultLimit,
            totalItems: totalItems,
            items: data,
        };
    }
    async findOne(id) {
        const existClub = await this.clubsRepository.existsBy({ id });
        if (!existClub)
            throw new common_1.BadRequestException(message_1.NOTFOUND_CLUB);
        const club = await this.clubsRepository.findOneBy({ id });
        return {
            ...club,
            sportType: club.sportType.name,
        };
    }
    async update(id, updateClubDto) {
        const { name } = updateClubDto;
        const existClub = await this.clubsRepository.existsBy({ id });
        if (!existClub)
            throw new common_1.BadRequestException(message_1.NOTFOUND_CLUB);
        const club = await this.clubsRepository.findOneBy({ name });
        if (club && club.id !== id)
            throw new common_1.BadRequestException(message_1.CONFLICT_CLUB);
        return this.clubsRepository.update(id, updateClubDto);
    }
    async remove(id) {
        return `This action removes a #${id} club`;
    }
};
exports.ClubsService = ClubsService;
exports.ClubsService = ClubsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(1, (0, typeorm_1.InjectRepository)(sport_type_entity_1.SportType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClubsService);
//# sourceMappingURL=clubs.service.js.map