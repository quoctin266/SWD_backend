"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSeeder = void 0;
const common_1 = require("@nestjs/common");
const member_entity_1 = require("../../module/members/entities/member.entity");
const post_entity_1 = require("../../module/posts/entities/post.entity");
const vin_slot_entity_1 = require("../../module/vin-slots/entities/vin-slot.entity");
const post_1 = require("../jsonData/post");
class PostSeeder {
    constructor() {
        this.logger = new common_1.Logger(PostSeeder.name);
    }
    async run(dataSource) {
        const postRepository = dataSource.getRepository(post_entity_1.Post);
        const memberRepository = dataSource.getRepository(member_entity_1.Member);
        const vinSlotRepository = dataSource.getRepository(vin_slot_entity_1.VinSlot);
        const countPost = (await postRepository.find()).length;
        const allMembers = await memberRepository.find();
        const allVinSlots = await vinSlotRepository.find();
        if (countPost === 0) {
            if (allMembers.length === 0) {
                this.logger.error('No Member found for seeding Post');
                return;
            }
            const postDbData = post_1.postData.map((post) => {
                const postedBy = allMembers.find((member) => member.id === post.postedBy);
                const likes = allMembers.filter((member) => post.likes.includes(member.id));
                const vinSlot = allVinSlots.find((vinSlot) => vinSlot.id === post.vinSlot);
                return {
                    ...post,
                    postedBy,
                    likes,
                    vinSlot,
                };
            });
            await postRepository.insert(postDbData);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.PostSeeder = PostSeeder;
//# sourceMappingURL=11_post.seed.js.map