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
exports.AreasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const area_entity_1 = require("./entities/area.entity");
const typeorm_2 = require("typeorm");
const message_1 = require("../../util/message");
let AreasService = class AreasService {
    constructor(areasRepository) {
        this.areasRepository = areasRepository;
    }
    async create(createAreaDto) {
        const { name } = createAreaDto;
        const existArea = await this.areasRepository.existsBy({ name });
        if (existArea)
            throw new common_1.BadRequestException(message_1.CONFLICT_AREA);
        const result = await this.areasRepository.insert(createAreaDto);
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { sortBy, sortDescending, current, pageSize, name } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.areasRepository.createQueryBuilder('area');
        if (name)
            query.andWhere('area.name ILike :name', { name: `%${name}%` });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['name'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `area.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
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
        const existArea = await this.areasRepository.existsBy({ id });
        if (!existArea)
            throw new common_1.BadRequestException(message_1.NOTFOUND_AREA);
        return this.areasRepository.findOneBy({ id });
    }
    async update(id, updateAreaDto) {
        const { name } = updateAreaDto;
        const existArea = await this.areasRepository.existsBy({ id });
        if (!existArea)
            throw new common_1.BadRequestException(message_1.NOTFOUND_AREA);
        const area = await this.areasRepository.findOneBy({ name });
        if (area && area.id !== id)
            throw new common_1.BadRequestException(message_1.CONFLICT_AREA);
        return this.areasRepository.update(id, updateAreaDto);
    }
    async remove(id) {
        const existArea = await this.areasRepository.existsBy({ id });
        if (!existArea)
            throw new common_1.BadRequestException(message_1.NOTFOUND_AREA);
        return this.areasRepository.softDelete(id);
    }
};
exports.AreasService = AreasService;
exports.AreasService = AreasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreasService);
//# sourceMappingURL=areas.service.js.map