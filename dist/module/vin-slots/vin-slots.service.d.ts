import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { VinSlot } from './entities/vin-slot.entity';
import { Repository } from 'typeorm';
import { Court } from '../courts/entities/court.entity';
import { Member } from '../members/entities/member.entity';
import { VinSlotFilterDto } from './dto/filter-vin-slot.dto';
import { SummaryFilterDto } from './dto/filter-slot-summary.dto';
export interface IMonthlySummary {
    name: string;
    value: number;
}
export declare class VinSlotsService {
    private vinSlotsRepository;
    private courtsRepository;
    private membersRepository;
    constructor(vinSlotsRepository: Repository<VinSlot>, courtsRepository: Repository<Court>, membersRepository: Repository<Member>);
    create(createVinSlotDto: CreateVinSlotDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: VinSlotFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            court: {
                name: string;
                type: string;
            };
            createdBy: {
                username: string;
                club: string;
            };
            id: number;
            capacity: number;
            status: string;
            beginAt: Date;
            endAt: Date;
            applications: import("../applications/entities/application.entity").Application[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        court: {
            name: string;
            type: string;
        };
        createdBy: {
            username: string;
            club: string;
        };
        id: number;
        capacity: number;
        status: string;
        beginAt: Date;
        endAt: Date;
        applications: import("../applications/entities/application.entity").Application[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateVinSlotDto: UpdateVinSlotDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
    getSummary(queryObj: SummaryFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: IMonthlySummary[];
    }>;
}
