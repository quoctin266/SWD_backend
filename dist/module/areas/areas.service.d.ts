import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';
import { AreaFilterDto } from './dto/filter-area.dto';
export declare class AreasService {
    private areasRepository;
    constructor(areasRepository: Repository<Area>);
    create(createAreaDto: CreateAreaDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: AreaFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: Area[];
    }>;
    findOne(id: number): Promise<Area>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
