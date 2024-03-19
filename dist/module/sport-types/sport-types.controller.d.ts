import { SportTypesService } from './sport-types.service';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { SportTypeFilterDto } from './dto/filter-sport-type.dto';
export declare class SportTypesController {
    private readonly sportTypesService;
    constructor(sportTypesService: SportTypesService);
    create(createSportTypeDto: CreateSportTypeDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: SportTypeFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: import("./entities/sport-type.entity").SportType[];
    }>;
    findOne(id: number): Promise<import("./entities/sport-type.entity").SportType>;
    update(id: number, updateSportTypeDto: UpdateSportTypeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
