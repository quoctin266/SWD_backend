import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { SportType } from '../sport-types/entities/sport-type.entity';
import { ClubFilterDto } from './dto/filter-club.dto';
export declare class ClubsService {
    private clubsRepository;
    private sportTypesRepository;
    constructor(clubsRepository: Repository<Club>, sportTypesRepository: Repository<SportType>);
    create(createClubDto: CreateClubDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: ClubFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            sportType: string;
            id: number;
            name: string;
            email: string;
            description: string;
            isActive: boolean;
            isCommon: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        sportType: string;
        id: number;
        name: string;
        email: string;
        description: string;
        isActive: boolean;
        isCommon: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateClubDto: UpdateClubDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<string>;
}
