import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberFilterDto } from './dto/filter-member.dto';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    create(createMemberDto: CreateMemberDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: MemberFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            club: string;
            user: string;
            id: number;
            isLeader: boolean;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        user: string;
        club: string;
        id: number;
        isLeader: boolean;
        joinedEvents: import("../events/entities/event.entity").Event[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }>;
    update(id: number, updateMemberDto: UpdateMemberDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
