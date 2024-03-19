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
exports.UsersService = exports.hashPassword = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const message_1 = require("../../util/message");
const roles_service_1 = require("../role/roles.service");
const member_entity_1 = require("../members/entities/member.entity");
const club_entity_1 = require("../clubs/entities/club.entity");
const wallet_entity_1 = require("../wallets/entities/wallet.entity");
const hashPassword = async (password) => {
    const salt = await (0, bcryptjs_1.genSalt)(10);
    const hashPW = await (0, bcryptjs_1.hash)(password, salt);
    return hashPW;
};
exports.hashPassword = hashPassword;
let UsersService = class UsersService {
    constructor(usersRepository, rolesService, membersRepository, clubsRepository, walletsRepository) {
        this.usersRepository = usersRepository;
        this.rolesService = rolesService;
        this.membersRepository = membersRepository;
        this.clubsRepository = clubsRepository;
        this.walletsRepository = walletsRepository;
    }
    async checkPassword(hash, password) {
        return await (0, bcryptjs_1.compare)(password, hash);
    }
    async updateUserToken(refreshToken, userId) {
        return await this.usersRepository.update(userId, {
            refreshToken,
        });
    }
    async registerUser(registerUserDTO) {
        const { username, email, password } = registerUserDTO;
        const user = await this.usersRepository.findOneBy({
            email,
        });
        if (user)
            throw new common_1.ConflictException(message_1.CONFLICT_EMAIL);
        const hashPW = await (0, exports.hashPassword)(password);
        const role = await this.rolesService.findOneByName('USER');
        const result = await this.usersRepository.insert({
            username,
            email,
            password: hashPW,
            role,
        });
        const createdUser = await this.usersRepository.findOneBy({ email });
        const commonClub = await this.clubsRepository.findOne({
            where: { isCommon: true },
        });
        await this.membersRepository.insert({
            user: createdUser,
            club: commonClub,
        });
        const createdMember = await this.membersRepository.findOneBy({
            user: createdUser,
            club: commonClub,
        });
        await this.walletsRepository.insert({
            club: commonClub,
            member: createdMember,
            balance: 50,
        });
        return result.generatedMaps[0];
    }
    async create(createUserDto) {
        const { email, roleId, password } = createUserDto;
        const userExist = await this.usersRepository.findOneBy({ email });
        if (userExist)
            throw new common_1.BadRequestException(message_1.CONFLICT_EMAIL);
        const role = await this.rolesService.findOneById(roleId);
        const hashPW = await (0, exports.hashPassword)(password);
        const result = await this.usersRepository.insert({
            ...createUserDto,
            password: hashPW,
            role,
        });
        const createdUser = await this.usersRepository.findOneBy({ email });
        const commonClub = await this.clubsRepository.findOne({
            where: { isCommon: true },
        });
        await this.membersRepository.insert({
            user: createdUser,
            club: commonClub,
        });
        return result.generatedMaps[0];
    }
    async findList(queryObj) {
        const { username, email, phone, isActive, roleId, sortBy, sortDescending, pageSize, current, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role');
        if (username)
            query.andWhere('user.username ILike :username', {
                username: `%${username}%`,
            });
        if (email)
            query.andWhere('user.email ILike :email', {
                email: `%${email}%`,
            });
        if (phone)
            query.andWhere('user.phone ILike :phone', {
                phone: `%${phone}%`,
            });
        if (typeof isActive === 'boolean')
            query.andWhere('user.isActive = :isActive', { isActive });
        if (roleId)
            query.andWhere('role.id =:id', { id: roleId });
        const totalItems = (await query.getMany()).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const sortableCriterias = ['username', 'email', 'dob'];
        const result = await query
            .orderBy(sortableCriterias.includes(sortBy) ? `user.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        const data = result.map((user) => {
            return {
                ...user,
                role: user.role.name,
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
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.BadRequestException(message_1.NOTFOUND_USER);
        return {
            ...user,
            role: user.role.name,
        };
    }
    findOneByToken(refreshToken) {
        return this.usersRepository.findOneBy({ refreshToken });
    }
    findOneByEmail(email) {
        return this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();
    }
    async update(id, updateUserDto) {
        const { username, password, roleId, ...rest } = updateUserDto;
        const user = await this.usersRepository.findOneBy({ username });
        if (user && user.id !== id)
            throw new common_1.BadRequestException(message_1.CONFLICT_USERNAME);
        const role = await this.rolesService.findOneById(roleId);
        if (!role)
            throw new common_1.BadRequestException('Role not found');
        let hashPW = '';
        if (password) {
            hashPW = await (0, exports.hashPassword)(password);
        }
        const existUser = await this.usersRepository.existsBy({ id });
        if (!existUser)
            throw new common_1.BadRequestException(message_1.NOTFOUND_USER);
        return this.usersRepository.update(id, {
            username,
            role,
            password: hashPW,
            ...rest,
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(3, (0, typeorm_1.InjectRepository)(club_entity_1.Club)),
    __param(4, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map