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
exports.CourtsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sport_type_entity_1 = require("../sport-types/entities/sport-type.entity");
const typeorm_2 = require("typeorm");
const court_entity_1 = require("./entities/court.entity");
const area_entity_1 = require("../areas/entities/area.entity");
const message_1 = require("../../util/message");
let CourtsService = class CourtsService {
    constructor(courtsRepository, sportTypesRepository, areasRepository) {
        this.courtsRepository = courtsRepository;
        this.sportTypesRepository = sportTypesRepository;
        this.areasRepository = areasRepository;
    }
    async create(createCourtDto) {
        const { name, sportTypeId, areaId } = createCourtDto;
        const existCourt = await this.courtsRepository.existsBy({ name });
        if (existCourt)
            throw new common_1.BadRequestException(message_1.CONFLICT_COURT);
        const existType = await this.sportTypesRepository.existsBy({
            id: sportTypeId,
        });
        if (!existType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        const existArea = await this.areasRepository.existsBy({ id: areaId });
        if (!existArea)
            throw new common_1.BadRequestException(message_1.NOTFOUND_AREA);
        const sportType = await this.sportTypesRepository.findOneBy({
            id: sportTypeId,
        });
        const area = await this.areasRepository.findOneBy({ id: areaId });
        const result = await this.courtsRepository.insert({
            ...createCourtDto,
            sportType,
            area,
        });
        return result.generatedMaps[0];
    }
    async count(queryObj) {
        const { year, top } = queryObj;
        const courts = await this.courtsRepository
            .createQueryBuilder('court')
            .leftJoinAndSelect('court.vinSlots', 'vinSlot')
            .andWhere('EXTRACT(YEAR FROM vinSlot.createdAt) = :year OR vinSlot.createdAt IS NULL', { year })
            .getMany();
        const result = courts
            .map((court) => {
            return {
                ...court,
                vinSlots: court.vinSlots.length,
            };
        })
            .sort((a, b) => b.vinSlots - a.vinSlots)
            .slice(0, top);
        return result;
    }
    async findList(queryObj) {
        const { name, isAvailable, sportTypeId, areaId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.courtsRepository
            .createQueryBuilder('court')
            .leftJoin('court.sportType', 'sportType')
            .leftJoin('court.area', 'area')
            .select(['sportType.name', 'area.name', 'court']);
        if (name)
            query.andWhere('court.name ILike :name', { name: `%${name}%` });
        if (typeof isAvailable === 'boolean')
            query.andWhere('court.isAvailable = :isAvailable', { isAvailable });
        if (sportTypeId)
            query
                .addSelect('sportType.id')
                .andWhere('sportType.id =:id', { id: sportTypeId });
        if (areaId)
            query.addSelect('area.id').andWhere('area.id =:id', { id: areaId });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['name'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `court.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((club) => {
            return {
                ...club,
                sportType: club.sportType.name,
                area: club.area.name,
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
        const existCourt = await this.courtsRepository.existsBy({ id });
        if (!existCourt)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COURT);
        const court = await this.courtsRepository.findOneBy({ id });
        return { ...court, sportType: court.sportType.name, area: court.area.name };
    }
    async update(id, updateCourtDto) {
        const { name, sportTypeId, areaId, ...rest } = updateCourtDto;
        const existCourt = await this.courtsRepository.existsBy({ id });
        if (!existCourt)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COURT);
        const court = await this.courtsRepository.findOneBy({ name });
        if (court && court.id !== id)
            throw new common_1.BadRequestException(message_1.CONFLICT_COURT);
        const sportType = await this.sportTypesRepository.findOneBy({
            id: sportTypeId,
        });
        if (!sportType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        const area = await this.areasRepository.findOneBy({ id: areaId });
        if (!area)
            throw new common_1.BadRequestException(message_1.NOTFOUND_AREA);
        return this.courtsRepository.update(id, {
            ...rest,
            name,
            sportType,
            area,
        });
    }
    async remove(id) {
        const existCourt = await this.courtsRepository.existsBy({ id });
        if (!existCourt)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COURT);
        return this.courtsRepository.softDelete(id);
    }
};
exports.CourtsService = CourtsService;
exports.CourtsService = CourtsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(1, (0, typeorm_1.InjectRepository)(sport_type_entity_1.SportType)),
    __param(2, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CourtsService);
//# sourceMappingURL=courts.service.js.map