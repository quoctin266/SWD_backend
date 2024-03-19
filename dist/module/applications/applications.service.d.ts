import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { User } from '../users/entities/user.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { ApplicationFilterDto } from './dto/filter-application.dto';
export declare class ApplicationsService {
    private applicationsRepository;
    private vinSlotsRepository;
    private membersRepository;
    private clubsRepository;
    private usersRepository;
    constructor(applicationsRepository: Repository<Application>, vinSlotsRepository: Repository<VinSlot>, membersRepository: Repository<Member>, clubsRepository: Repository<Club>, usersRepository: Repository<User>);
    create(userId: number, slotId: number): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: ApplicationFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            vinSlot: {
                court: string;
                id: number;
                capacity: number;
                status: string;
                beginAt: Date;
                endAt: Date;
                createdBy: Member;
                applications: Application[];
                createdAt: Date;
                updatedAt: Date;
            };
            createdBy: string;
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        vinSlot: {
            court: string;
            id: number;
            capacity: number;
            status: string;
            beginAt: Date;
            endAt: Date;
            createdBy: Member;
            applications: Application[];
            createdAt: Date;
            updatedAt: Date;
        };
        createdBy: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, status: string): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
