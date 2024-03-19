import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ClubFilterDto } from './dto/filter-club.dto';
export declare class ClubsController {
    private readonly clubsService;
    constructor(clubsService: ClubsService);
    create(createClubDto: CreateClubDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: ClubFilterDto): Promise<{
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
    remove(id: string): Promise<string>;
}
