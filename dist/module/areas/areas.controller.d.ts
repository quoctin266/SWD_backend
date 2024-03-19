import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaFilterDto } from './dto/filter-area.dto';
export declare class AreasController {
    private readonly areasService;
    constructor(areasService: AreasService);
    create(createAreaDto: CreateAreaDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: AreaFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: import("./entities/area.entity").Area[];
    }>;
    findOne(id: number): Promise<import("./entities/area.entity").Area>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
