"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSeeder = void 0;
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("../../module/comments/entities/comment.entity");
const member_entity_1 = require("../../module/members/entities/member.entity");
const post_entity_1 = require("../../module/posts/entities/post.entity");
const comment_1 = require("../jsonData/comment");
class CommentSeeder {
    constructor() {
        this.logger = new common_1.Logger(CommentSeeder.name);
    }
    async run(dataSource) {
        const postRepository = dataSource.getRepository(post_entity_1.Post);
        const memberRepository = dataSource.getRepository(member_entity_1.Member);
        const commentRepository = dataSource.getRepository(comment_entity_1.Comment);
        const countComment = (await commentRepository.find()).length;
        const allPosts = await postRepository.find();
        const allMembers = await memberRepository.find();
        if (countComment === 0) {
            if (allMembers.length === 0) {
                this.logger.error('No Member found for seeding Comment');
                return;
            }
            const commentDbData = comment_1.commentData.map((comment) => {
                const post = allPosts.find((post) => post.id === comment.post);
                const createdBy = allMembers.find((member) => member.id === comment.createdBy);
                return {
                    ...comment,
                    post,
                    createdBy,
                };
            });
            await commentRepository.insert(commentDbData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.CommentSeeder = CommentSeeder;
//# sourceMappingURL=12_comment.seed.js.map