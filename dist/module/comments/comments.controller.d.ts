import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentFilterDto } from './dto/filter-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto): Promise<import("typeorm").ObjectLiteral[]>;
    findList(query: CommentFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: import("./entities/comment.entity").Comment[];
    }>;
    findOne(id: string): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
