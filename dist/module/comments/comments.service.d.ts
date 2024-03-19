import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Member } from '../members/entities/member.entity';
import { Comment } from './entities/comment.entity';
import { CommentFilterDto } from './dto/filter-comment.dto';
export declare class CommentsService {
    private commentsRepository;
    private postsRepository;
    private membersRepository;
    constructor(commentsRepository: Repository<Comment>, postsRepository: Repository<Post>, membersRepository: Repository<Member>);
    create(createCommentDto: CreateCommentDto): Promise<import("typeorm").ObjectLiteral[]>;
    findList(queryObj: CommentFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: Comment[];
    }>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
