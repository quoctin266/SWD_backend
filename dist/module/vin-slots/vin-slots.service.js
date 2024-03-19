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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinSlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vin_slot_entity_1 = require("./entities/vin-slot.entity");
const typeorm_2 = require("typeorm");
const court_entity_1 = require("../courts/entities/court.entity");
const member_entity_1 = require("../members/entities/member.entity");
const message_1 = require("../../util/message");
const moment_1 = __importDefault(require("moment"));
let VinSlotsService = class VinSlotsService {
    constructor(vinSlotsRepository, courtsRepository, membersRepository) {
        this.vinSlotsRepository = vinSlotsRepository;
        this.courtsRepository = courtsRepository;
        this.membersRepository = membersRepository;
    }
    async create(createVinSlotDto) {
        const { beginAt, endAt, capacity, courtId, memberId } = createVinSlotDto;
        const court = await this.courtsRepository.findOneBy({
            id: courtId,
            isAvailable: true,
        });
        if (!court)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COURT);
        const member = await this.membersRepository.findOneBy({ id: memberId });
        if (!member)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        const slot = await this.vinSlotsRepository.findOne({
            where: [
                {
                    court,
                    beginAt: (0, typeorm_2.Between)((0, moment_1.default)(beginAt).toDate(), (0, moment_1.default)(endAt).toDate()),
                },
                {
                    court,
                    endAt: (0, typeorm_2.Between)((0, moment_1.default)(beginAt).toDate(), (0, moment_1.default)(endAt).toDate()),
                },
            ],
        });
        if (slot)
            throw new common_1.BadRequestException(message_1.CONFLICT_SLOT);
        const result = await this.vinSlotsRepository.insert({
            beginAt,
            endAt,
            capacity,
            court,
            createdBy: member,
        });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { status, createdBy, courtId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.vinSlotsRepository
            .createQueryBuilder('vinSlot')
            .leftJoinAndSelect('vinSlot.court', 'court')
            .leftJoinAndSelect('court.sportType', 'sportType')
            .leftJoinAndSelect('vinSlot.createdBy', 'member')
            .leftJoinAndSelect('member.user', 'user')
            .leftJoinAndSelect('member.club', 'club');
        if (status)
            query.andWhere('vinSlot.status ILike :status', { status: `%${status}%` });
        if (courtId)
            query.andWhere('court.id =:id', { id: courtId });
        if (createdBy)
            query.andWhere('member.id =:id', { id: createdBy });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['capacity', 'beginAt', 'endAt'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `vinSlot.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((slot) => {
            return {
                ...slot,
                court: {
                    name: slot.court.name,
                    type: slot.court.sportType.name,
                },
                createdBy: {
                    username: slot.createdBy.user.username,
                    club: slot.createdBy.club.name,
                },
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
        const slot = await this.vinSlotsRepository.findOneBy({ id });
        if (!slot)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SLOT);
        return {
            ...slot,
            court: {
                name: slot.court.name,
                type: slot.court.sportType.name,
            },
            createdBy: {
                username: slot.createdBy.user.username,
                club: slot.createdBy.club.name,
            },
        };
    }
    async update(id, updateVinSlotDto) {
        const { beginAt, endAt, capacity, status, courtId } = updateVinSlotDto;
        const court = await this.courtsRepository.findOneBy({
            id: courtId,
            isAvailable: true,
        });
        if (!court)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COURT);
        const statusValues = ['ONGOING', 'COMPLETED', 'CANCELED'];
        if (status && !statusValues.includes(status))
            throw new common_1.BadRequestException(message_1.INVALID_STATUS);
        const slot = await this.vinSlotsRepository.findOneBy({ id });
        if (!slot)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SLOT);
        if (capacity < slot.applications.length)
            throw new common_1.BadRequestException(message_1.INVALID_CAPACITY);
        const existSlot = await this.vinSlotsRepository.findOne({
            where: [
                {
                    court,
                    beginAt: (0, typeorm_2.Between)((0, moment_1.default)(beginAt).toDate(), (0, moment_1.default)(endAt).toDate()),
                },
                {
                    court,
                    endAt: (0, typeorm_2.Between)((0, moment_1.default)(beginAt).toDate(), (0, moment_1.default)(endAt).toDate()),
                },
            ],
        });
        if (existSlot)
            throw new common_1.BadRequestException(message_1.CONFLICT_SLOT);
        return this.vinSlotsRepository.update(id, {
            beginAt,
            endAt,
            status,
            capacity,
            court,
        });
    }
    remove(id) {
        return `This action removes a #${id} vinSlot`;
    }
    async getSummary(queryObj) {
        const { summaryFrom, summaryTo, weekly, current } = queryObj;
        const defaultLimit = weekly ? 7 : 12;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const fromDate = (0, moment_1.default)(summaryFrom).startOf(weekly ? 'day' : 'month');
        const endDate = (0, moment_1.default)(summaryTo).endOf(weekly ? 'day' : 'month');
        if (weekly) {
            const dateRange = endDate.diff(fromDate, 'days');
            if (dateRange < 7 || dateRange > 31) {
                throw new common_1.BadRequestException('Weekly data is only available from a week to a month.');
            }
        }
        const countTimeRange = endDate.diff(fromDate, weekly ? 'days' : 'months') + 1;
        const totalPage = Math.ceil(countTimeRange / defaultLimit);
        const data = [];
        let currentMonth = (0, moment_1.default)(fromDate);
        while (currentMonth.isSameOrBefore(endDate)) {
            if (weekly) {
                const tmpCurrentMonth = (0, moment_1.default)(currentMonth);
                const weekStart = tmpCurrentMonth.startOf('day').toDate();
                let weekEnd = null;
                if (!tmpCurrentMonth.endOf('week').isAfter(endDate)) {
                    weekEnd = tmpCurrentMonth.endOf('week').toDate();
                }
                else {
                    weekEnd = endDate.toDate();
                }
                const periodLength = (0, moment_1.default)(weekEnd).diff(weekStart, 'days') + 1;
                for (let i = 0; i < periodLength; i++) {
                    const dayName = currentMonth.startOf('day').format('dddd');
                    const count = await this.vinSlotsRepository.count({
                        where: {
                            createdAt: (0, typeorm_2.Between)(currentMonth.startOf('day').toDate(), currentMonth.endOf('day').toDate()),
                        },
                    });
                    currentMonth.startOf('day');
                    data.push({ name: dayName, value: count });
                    if (!tmpCurrentMonth.startOf('day').isSame(currentMonth))
                        currentMonth.add(1, 'day');
                }
                currentMonth.startOf('week').add(1, 'week');
            }
            else {
                const monthName = currentMonth.format('MMMM');
                const monthStart = currentMonth.startOf('month').toDate();
                const monthEnd = currentMonth.endOf('month').toDate();
                const count = await this.vinSlotsRepository.count({
                    where: {
                        createdAt: (0, typeorm_2.Between)(monthStart, monthEnd),
                    },
                });
                data.push({ name: monthName, value: count });
                currentMonth.add(1, 'month');
            }
        }
        const result = data.slice(offset, offset + defaultLimit);
        return {
            currentPage: defaultPage,
            totalPages: totalPage,
            pageSize: defaultLimit,
            totalItems: countTimeRange,
            items: result,
        };
    }
};
exports.VinSlotsService = VinSlotsService;
exports.VinSlotsService = VinSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vin_slot_entity_1.VinSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VinSlotsService);
//# sourceMappingURL=vin-slots.service.js.map