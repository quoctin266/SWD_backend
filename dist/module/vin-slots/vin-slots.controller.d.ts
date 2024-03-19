import { VinSlotsService } from './vin-slots.service';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { VinSlotFilterDto } from './dto/filter-vin-slot.dto';
import { SummaryFilterDto } from './dto/filter-slot-summary.dto';
export declare class VinSlotsController {
    private readonly vinSlotsService;
    constructor(vinSlotsService: VinSlotsService);
    create(createVinSlotDto: CreateVinSlotDto): Promise<import("typeorm").ObjectLiteral>;
    getSummary(query: SummaryFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: import("./vin-slots.service").IMonthlySummary[];
    }>;
    findList(query: VinSlotFilterDto): Promise<{
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
}
