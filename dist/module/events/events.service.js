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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./entities/event.entity");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("../clubs/entities/club.entity");
const message_1 = require("../../util/message");
const member_entity_1 = require("../members/entities/member.entity");
let EventsService = class EventsService {
    constructor(clubsRepository, eventsRepository, membersRepository) {
        this.clubsRepository = clubsRepository;
        this.eventsRepository = eventsRepository;
        this.membersRepository = membersRepository;
    }
    async create(createEventDto) {
        const { clubId } = createEventDto;
        const club = await this.clubsRepository.findOneBy({
            id: clubId,
        });
        if (!club)
            throw new common_1.BadRequestException(message_1.NOTFOUND_CLUB);
        const result = await this.eventsRepository.insert({
            ...createEventDto,
            club,
        });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { name, location, status, memberId, clubId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.eventsRepository
            .createQueryBuilder('event')
            .leftJoin('event.club', 'club')
            .leftJoin('event.participants', 'member')
            .select(['club.name', 'member.id', 'event']);
        if (name)
            query.andWhere('event.name ILike :name', { name: `%${name}%` });
        if (location)
            query.andWhere('event.location ILike :location', {
                location: `%${location}%`,
            });
        if (status)
            query.andWhere('event.status = :status', { status });
        if (clubId)
            query.addSelect('club.id').andWhere('club.id =:id', { id: clubId });
        if (memberId)
            query.andWhere('member.id =:id', { id: memberId });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = [
            'name',
            'startDate',
            'endDate',
            'registrationDeadline',
        ];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `event.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((event) => {
            const { participants, ...rest } = event;
            return {
                ...rest,
                club: event.club.name,
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
        const existEvent = await this.eventsRepository.existsBy({ id });
        if (!existEvent)
            throw new common_1.BadRequestException(message_1.NOTFOUND_EVENT);
        const event = await this.eventsRepository.findOneBy({ id });
        return {
            ...event,
            club: event.club.name,
        };
    }
    async update(id, updateEventDto) {
        const { name, status, memberIds } = updateEventDto;
        const statusValues = ['ONGOING', 'COMPLETED', 'CANCELED'];
        if (status && !statusValues.includes(status))
            throw new common_1.BadRequestException(message_1.INVALID_STATUS);
        const existEvent = await this.eventsRepository.existsBy({ id });
        if (!existEvent)
            throw new common_1.BadRequestException(message_1.NOTFOUND_EVENT);
        if (name) {
            const event = await this.eventsRepository.findOneBy({ name });
            if (event && event.id !== id)
                throw new common_1.BadRequestException(message_1.CONFLICT_EVENT);
        }
        if (memberIds) {
            const members = await this.membersRepository.findBy({
                id: (0, typeorm_2.In)(memberIds),
            });
            const event = await this.eventsRepository.findOneBy({ id });
            event.participants = members;
            await this.eventsRepository.save(event);
        }
        delete updateEventDto.memberIds;
        return this.eventsRepository.update(id, updateEventDto);
    }
    remove(id) {
        return `This action removes a #${id} event`;
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map