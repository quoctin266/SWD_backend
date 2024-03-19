import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { SportType } from './entities/sport-type.entity';
import { Repository } from 'typeorm';
import { SportTypeFilterDto } from './dto/filter-sport-type.dto';
export declare class SportTypesService {
    private sportTypesRepository;
    constructor(sportTypesRepository: Repository<SportType>);
    create(createSportTypeDto: CreateSportTypeDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: SportTypeFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: SportType[];
    }>;
    findOne(id: number): Promise<SportType>;
    update(id: number, updateSportTypeDto: UpdateSportTypeDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
