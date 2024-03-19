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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_1 = require("../../util/message");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../comments/entities/comment.entity");
const member_entity_1 = require("../members/entities/member.entity");
const vin_slot_entity_1 = require("../vin-slots/entities/vin-slot.entity");
const post_entity_1 = require("./entities/post.entity");
let PostsService = class PostsService {
    constructor(postsRepository, memberRepository, commentRepository, vinSlotRepository) {
        this.postsRepository = postsRepository;
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;
        this.vinSlotRepository = vinSlotRepository;
    }
    async create(createPostDto) {
        const { content, postedBy, vinSlot } = createPostDto;
        const postedByDb = await this.memberRepository.findOne({
            where: { id: postedBy },
        });
        if (!postedByDb)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        const vinSLotDb = await this.vinSlotRepository.findOne({
            where: { id: vinSlot },
        });
        if (!vinSLotDb)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SLOT);
        const savedPost = await this.postsRepository.insert({
            ...createPostDto,
            postedBy: postedByDb,
            vinSlot: vinSLotDb,
        });
        return savedPost;
    }
    async findList(queryObj) {
        const { contains, postedBy, vinSlot, current, pageSize, sortBy, sortDescending, } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.postedBy', 'postedBy')
            .leftJoinAndSelect('post.likes', 'likes')
            .leftJoinAndSelect('post.vinSlot', 'vinSlot');
        if (contains)
            query.andWhere('post.content LIKE :contains', {
                contains: `%${contains}%`,
            });
        if (postedBy)
            query.andWhere('post.postedBy = :postedBy', { postedBy: postedBy });
        if (vinSlot)
            query.andWhere('post.vinSlot = :vinSlot', { vinSlot: vinSlot });
        const numberOfPost = (await query.getMany()).length;
        const totalPage = Math.ceil(numberOfPost / defaultLimit);
        const sortCriteria = ['createdAt', 'updatedAt', 'id'];
        const result = await query
            .orderBy(sortCriteria.includes(sortBy) ? `post.${sortBy}` : 'post.id', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        return {
            currentPage: defaultPage,
            totalPages: totalPage,
            pageSize: defaultLimit,
            totalItems: numberOfPost,
            items: result,
        };
    }
    async findOne(id) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['postedBy', 'vinSlot', 'likes'],
        });
        if (!post)
            throw new common_1.NotFoundException(message_1.NOTFOUND_POST);
        return post;
    }
    async update(id, updatePostDto, queryObj) {
        const { content, postedBy, vinSlot } = updatePostDto;
        const { memberId, isDislike } = queryObj;
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['likes'],
        });
        if (!post)
            throw new common_1.NotFoundException(message_1.NOTFOUND_POST);
        const postedByDb = await this.memberRepository.findOne({
            where: { id: postedBy },
        });
        if (!postedByDb)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        const vinSLotDb = await this.vinSlotRepository.findOne({
            where: { id: vinSlot },
        });
        if (!vinSLotDb)
            throw new common_1.BadRequestException(message_1.NOTFOUND_SLOT);
        if (memberId) {
            if (!isDislike) {
                const member = await this.memberRepository.findOne({
                    where: { id: memberId },
                });
                if (!member)
                    throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
                post.likes = [...post.likes, member];
            }
            else {
                const member = await this.memberRepository.findOne({
                    where: { id: memberId },
                });
                if (!member)
                    throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
                post.likes = post.likes.filter((like) => like.id !== memberId);
            }
        }
        const updatedPost = await this.postsRepository.save({
            ...post,
            content,
            postedBy: postedByDb,
            vinSlot: vinSLotDb,
        });
        return updatedPost;
    }
    async remove(id) {
        const existingPost = await this.postsRepository.findOne({
            where: { id },
        });
        if (!existingPost)
            throw new common_1.NotFoundException(message_1.NOTFOUND_POST);
        return this.postsRepository.softDelete({ id });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(vin_slot_entity_1.VinSlot)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map