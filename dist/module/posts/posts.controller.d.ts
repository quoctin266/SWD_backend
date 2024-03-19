import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFilterDto } from './dto/filter-post.dto';
import { UpdateFilterDto } from './dto/filter-update.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<import("typeorm").InsertResult>;
    findList(query: PostFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: import("./entities/post.entity").Post[];
    }>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto, query: UpdateFilterDto): Promise<{
        content: string;
        postedBy: import("../members/entities/member.entity").Member;
        vinSlot: import("../vin-slots/entities/vin-slot.entity").VinSlot;
        id: number;
        likes: import("../members/entities/member.entity").Member[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & import("./entities/post.entity").Post>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
