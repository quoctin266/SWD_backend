import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { SportType } from '../sport-types/entities/sport-type.entity';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { Area } from '../areas/entities/area.entity';
import { CourtFilterDto } from './dto/filter-court.dto';
import { CourtCountFilterDto } from './dto/filter-count.dto';
export declare class CourtsService {
    private courtsRepository;
    private sportTypesRepository;
    private areasRepository;
    constructor(courtsRepository: Repository<Court>, sportTypesRepository: Repository<SportType>, areasRepository: Repository<Area>);
    create(createCourtDto: CreateCourtDto): Promise<import("typeorm").ObjectLiteral>;
    count(queryObj: CourtCountFilterDto): Promise<{
        vinSlots: number;
        id: number;
        name: string;
        description: string;
        isAvailable: boolean;
        sportType: SportType;
        area: Area;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }[]>;
    findList(queryObj: CourtFilterDto): Promise<{
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
