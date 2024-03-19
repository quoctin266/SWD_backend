import { Member } from 'src/module/members/entities/member.entity';
import { Post } from 'src/module/posts/entities/post.entity';
export declare class Comment {
    id: number;
    content: string;
    likes: number;
    post: Post;
    createdBy: Member;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
