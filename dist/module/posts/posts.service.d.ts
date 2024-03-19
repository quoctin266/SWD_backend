import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { Member } from '../members/entities/member.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFilterDto } from './dto/filter-post.dto';
import { UpdateFilterDto } from './dto/filter-update.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private readonly postsRepository;
    private readonly memberRepository;
    private readonly commentRepository;
    private readonly vinSlotRepository;
    constructor(postsRepository: Repository<Post>, memberRepository: Repository<Member>, commentRepository: Repository<Comment>, vinSlotRepository: Repository<VinSlot>);
    create(createPostDto: CreatePostDto): Promise<import("typeorm").InsertResult>;
    findList(queryObj: PostFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: Post[];
    }>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto, queryObj: UpdateFilterDto): Promise<{
        content: string;
        postedBy: Member;
        vinSlot: VinSlot;
        id: number;
        likes: Member[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & Post>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
