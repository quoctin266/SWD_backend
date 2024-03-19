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
exports.SportTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sport_type_entity_1 = require("./entities/sport-type.entity");
const typeorm_2 = require("typeorm");
const message_1 = require("../../util/message");
let SportTypesService = class SportTypesService {
    constructor(sportTypesRepository) {
        this.sportTypesRepository = sportTypesRepository;
    }
    async create(createSportTypeDto) {
        const { name } = createSportTypeDto;
        const existType = await this.sportTypesRepository.existsBy({ name });
        if (existType)
            throw new common_1.BadRequestException(message_1.CONFLICT_SPORT_TYPE);
        const result = await this.sportTypesRepository.insert(createSportTypeDto);
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { sortBy, sortDescending, current, pageSize, name } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.sportTypesRepository.createQueryBuilder('sportType');
        if (name)
            query.andWhere('sportType.name ILike :name', { name: `%${name}%` });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['name'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `sportType.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        return {
            currentPage: defaultPage,
            totalPages: totalPages,
            pageSize: defaultLimit,
            totalItems: totalItems,
            items: result,
        };
    }
    async findOne(id) {
        const existType = await this.sportTypesRepository.existsBy({ id });
        if (!existType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        return this.sportTypesRepository.findOneBy({ id });
    }
    async update(id, updateSportTypeDto) {
        const { name } = updateSportTypeDto;
        const existType = await this.sportTypesRepository.existsBy({ id });
        if (!existType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        const sportType = await this.sportTypesRepository.findOneBy({ name });
        if (sportType && sportType.id !== id)
            throw new common_1.BadRequestException(message_1.CONFLICT_SPORT_TYPE);
        return this.sportTypesRepository.update(id, updateSportTypeDto);
    }
    async remove(id) {
        const existType = await this.sportTypesRepository.existsBy({ id });
        if (!existType)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SPORT_TYPE);
        return this.sportTypesRepository.softDelete(id);
    }
};
exports.SportTypesService = SportTypesService;
exports.SportTypesService = SportTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sport_type_entity_1.SportType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SportTypesService);
//# sourceMappingURL=sport-types.service.js.map