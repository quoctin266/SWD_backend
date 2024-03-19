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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const application_entity_1 = require("./entities/application.entity");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("../members/entities/member.entity");
const club_entity_1 = require("../clubs/entities/club.entity");
const user_entity_1 = require("../users/entities/user.entity");
const vin_slot_entity_1 = require("../vin-slots/entities/vin-slot.entity");
const message_1 = require("../../util/message");
let ApplicationsService = class ApplicationsService {
    constructor(applicationsRepository, vinSlotsRepository, membersRepository, clubsRepository, usersRepository) {
        this.applicationsRepository = applicationsRepository;
        this.vinSlotsRepository = vinSlotsRepository;
        this.membersRepository = membersRepository;
        this.clubsRepository = clubsRepository;
        this.usersRepository = usersRepository;
    }
    async create(userId, slotId) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        const club = await this.clubsRepository.findOneBy({ isCommon: true });
        const commonMember = await this.membersRepository.findOneBy({ user, club });
        const vinSlot = await this.vinSlotsRepository.findOneBy({ id: slotId });
        if (!vinSlot)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SLOT);
        const result = await this.applicationsRepository.insert({
            vinSlot,
            createdBy: commonMember,
        });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { status, memberId, vinSlotId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.applicationsRepository
            .createQueryBuilder('application')
            .leftJoinAndSelect('application.vinSlot', 'vinSlot')
            .leftJoinAndSelect('application.createdBy', 'member')
            .leftJoinAndSelect('vinSlot.court', 'court')
            .leftJoinAndSelect('member.user', 'user');
        if (status)
            query.andWhere('application.status ILike :status', {
                status: `%${status}%`,
            });
        if (memberId)
            query.andWhere('member.id =:id', { id: memberId });
        if (vinSlotId)
            query.andWhere('vinSlot.id =:id', { id: vinSlotId });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['createdAt'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `application.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((application) => {
            return {
                ...application,
                vinSlot: {
                    ...application.vinSlot,
                    court: application.vinSlot.court.name,
                },
                createdBy: application.createdBy.user.username,
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
        const application = await this.applicationsRepository.findOneBy({ id });
        if (!application)
            throw new common_1.BadRequestException(message_1.NOTFOUND_APPLICATION);
        delete application.vinSlot.createdBy;
        return {
            ...application,
            vinSlot: {
                ...application.vinSlot,
                court: application.vinSlot.court.name,
            },
            createdBy: application.createdBy.user.username,
        };
    }
    async update(id, status) {
        const existApplication = await this.applicationsRepository.existsBy({ id });
        if (!existApplication)
            throw new common_1.BadRequestException(message_1.NOTFOUND_APPLICATION);
        const statusValues = ['PENDING', 'COMPLETED', 'CANCELED'];
        if (status && !statusValues.includes(status))
            throw new common_1.BadRequestException(message_1.INVALID_STATUS);
        return this.applicationsRepository.update(id, { status });
    }
    remove(id) {
        return `This action removes a #${id} application`;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(vin_slot_entity_1.VinSlot)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(3, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map