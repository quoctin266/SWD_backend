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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("../clubs/entities/club.entity");
const user_entity_1 = require("../users/entities/user.entity");
const member_entity_1 = require("./entities/member.entity");
const message_1 = require("../../util/message");
let MembersService = class MembersService {
    constructor(clubsRepository, usersRepository, membersRepository) {
        this.clubsRepository = clubsRepository;
        this.usersRepository = usersRepository;
        this.membersRepository = membersRepository;
    }
    async create(createMemberDto) {
        const { userId, clubId } = createMemberDto;
        const club = await this.clubsRepository.findOneBy({ id: clubId });
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!club)
            throw new common_1.BadRequestException(message_1.NOTFOUND_CLUB);
        if (!user)
            throw new common_1.BadRequestException(message_1.NOTFOUND_USER);
        console.log(club);
        const result = await this.membersRepository.insert({ club: club, user });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { isLeader, eventId, clubId, userId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.membersRepository
            .createQueryBuilder('member')
            .leftJoin('member.club', 'club')
            .leftJoin('member.user', 'user')
            .leftJoin('member.joinedEvents', 'event')
            .select(['club.name', 'user.username', 'event.id', 'member']);
        if (typeof isLeader === 'boolean')
            query.andWhere('member.isLeader = :isLeader', { isLeader });
        if (eventId)
            query.andWhere('event.id =:id', { id: eventId });
        if (clubId)
            query.addSelect('club.id').andWhere('club.id =:id', { id: clubId });
        if (userId)
            query.addSelect('user.id').andWhere('user.id =:id', { id: userId });
        else
            query.andWhere('club.name != :name', { name: 'Common' });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['createdAt'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `member.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((member) => {
            const { joinedEvents, ...rest } = member;
            return {
                ...rest,
                club: member.club.name,
                user: member.user.username,
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
        const existMember = await this.membersRepository.existsBy({ id });
        if (!existMember)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        const member = await this.membersRepository.findOneBy({ id });
        return { ...member, user: member.user.username, club: member.club.name };
    }
    async update(id, updateMemberDto) {
        const existMember = await this.membersRepository.existsBy({ id });
        if (!existMember)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        return this.membersRepository.update(id, updateMemberDto);
    }
    async remove(id) {
        const existMember = await this.membersRepository.existsBy({ id });
        if (!existMember)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        return this.membersRepository.softDelete(id);
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MembersService);
//# sourceMappingURL=members.service.js.map