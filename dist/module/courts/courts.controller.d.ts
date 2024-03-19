import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { CourtFilterDto } from './dto/filter-court.dto';
import { CourtCountFilterDto } from './dto/filter-count.dto';
export declare class CourtsController {
    private readonly courtsService;
    constructor(courtsService: CourtsService);
    create(createCourtDto: CreateCourtDto): Promise<import("typeorm").ObjectLiteral>;
    count(query: CourtCountFilterDto): Promise<{
        vinSlots: number;
        id: number;
        name: string;
        description: string;
        isAvailable: boolean;
        sportType: import("../sport-types/entities/sport-type.entity").SportType;
        area: import("../areas/entities/area.entity").Area;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }[]>;
    findList(query: CourtFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            sportType: string;
            area: string;
            id: number;
            name: string;
            description: string;
            isAvailable: boolean;
            vinSlots: import("../vin-slots/entities/vin-slot.entity").VinSlot[];
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        sportType: string;
        area: string;
        id: number;
        name: string;
        description: string;
        isAvailable: boolean;
        vinSlots: import("../vin-slots/entities/vin-slot.entity").VinSlot[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }>;
    update(id: number, updateCourtDto: UpdateCourtDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
