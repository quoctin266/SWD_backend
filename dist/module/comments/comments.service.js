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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../posts/entities/post.entity");
const member_entity_1 = require("../members/entities/member.entity");
const message_1 = require("../../util/message");
const comment_entity_1 = require("./entities/comment.entity");
let CommentsService = class CommentsService {
    constructor(commentsRepository, postsRepository, membersRepository) {
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
        this.membersRepository = membersRepository;
    }
    async create(createCommentDto) {
        const { content, postId, createdBy } = createCommentDto;
        const post = await this.postsRepository.findOne({
            where: { id: postId },
        });
        if (!post)
            throw new common_1.BadRequestException(message_1.NOTFOUND_POST);
        const createdByDb = await this.membersRepository.findOne({
            where: { id: createdBy },
        });
        if (!createdByDb)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        const comment = await this.commentsRepository.insert({
            likes: 0,
            content,
            post,
            createdBy: createdByDb,
        });
        if (!comment)
            throw new common_1.BadRequestException(message_1.FAIL_CREATE_COMMENT);
        return comment.generatedMaps;
    }
    async findList(queryObj) {
        const { postId, createdBy, current, pageSize, sortBy, sortDescending } = queryObj;
        const defaultLimit = pageSize ? pageSize : 10;
        const defaultPage = current ? current : 1;
        const offset = (defaultPage - 1) * defaultLimit;
        const query = this.commentsRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.post', 'post')
            .leftJoinAndSelect('comment.createdBy', 'createdBy');
        if (createdBy) {
            query.andWhere('comment.createdBy = :createdBy', { createdBy });
        }
        if (postId) {
            query.andWhere('comment.post = :postId', { postId });
        }
        const numberOfComment = (await query.getMany()).length;
        const totalPage = Math.ceil(numberOfComment / defaultLimit);
        const sortCriteria = ['createdAt', 'updatedAt', 'id'];
        const result = await query
            .orderBy(sortCriteria.includes(sortBy) ? `comment.${sortBy}` : 'comment.id', sortDescending ? 'DESC' : 'ASC')
            .offset(offset)
            .limit(defaultLimit)
            .getMany();
        return {
            currentPage: defaultPage,
            totalPages: totalPage,
            pageSize: defaultLimit,
            totalItems: numberOfComment,
            items: result,
        };
    }
    async findOne(id) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['post', 'createdBy'],
        });
        if (!comment)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COMMENT);
        return comment;
    }
    async update(id, updateCommentDto) {
        const existingComment = await this.commentsRepository.findOne({
            where: { id },
        });
        if (!existingComment)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COMMENT);
        const post = await this.postsRepository.findOne({
            where: { id: updateCommentDto.postId },
        });
        if (!post)
            throw new common_1.BadRequestException(message_1.NOTFOUND_POST);
        const createdBy = await this.membersRepository.findOne({
            where: { id: updateCommentDto.createdBy },
        });
        if (!createdBy)
            throw new common_1.BadRequestException(message_1.NOTFOUND_MEMBER);
        if (updateCommentDto.likes) {
            if (updateCommentDto.likes - existingComment.likes > 1)
                throw new common_1.BadRequestException(message_1.FAIL_UPDATE_COMMENT);
            else if (existingComment.likes - updateCommentDto.likes > 1)
                throw new common_1.BadRequestException(message_1.FAIL_UPDATE_COMMENT);
        }
        const comment = await this.commentsRepository.update(id, {
            content: updateCommentDto.content,
            post,
            createdBy,
            likes: updateCommentDto.likes,
        });
        return comment;
    }
    async remove(id) {
        const existingComment = await this.commentsRepository.findOne({
            where: { id },
        });
        if (!existingComment)
            throw new common_1.BadRequestException(message_1.NOTFOUND_COMMENT);
        return this.commentsRepository.softDelete(existingComment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map