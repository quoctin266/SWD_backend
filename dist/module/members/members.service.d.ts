import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { Club } from '../clubs/entities/club.entity';
import { User } from '../users/entities/user.entity';
import { Member } from './entities/member.entity';
import { MemberFilterDto } from './dto/filter-member.dto';
export declare class MembersService {
    private clubsRepository;
    private usersRepository;
    private membersRepository;
    constructor(clubsRepository: Repository<Club>, usersRepository: Repository<User>, membersRepository: Repository<Member>);
    create(createMemberDto: CreateMemberDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: MemberFilterDto): Promise<{
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
