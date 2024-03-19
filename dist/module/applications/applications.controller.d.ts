import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { IUser } from '../users/dto/users.dto';
import { ApplicationFilterDto } from './dto/filter-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(createApplicationDto: CreateApplicationDto, user: IUser): Promise<import("typeorm").ObjectLiteral>;
    findList(query: ApplicationFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            vinSlot: {
                court: string;
                id: number;
                capacity: number;
                status: string;
                beginAt: Date;
                endAt: Date;
                createdBy: import("../members/entities/member.entity").Member;
                applications: import("./entities/application.entity").Application[];
                createdAt: Date;
                updatedAt: Date;
            };
            createdBy: string;
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        vinSlot: {
            court: string;
            id: number;
            capacity: number;
            status: string;
            beginAt: Date;
            endAt: Date;
            createdBy: import("../members/entities/member.entity").Member;
            applications: import("./entities/application.entity").Application[];
            createdAt: Date;
            updatedAt: Date;
        };
        createdBy: string;
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateApplicationDto: UpdateApplicationDto): Promise<import("typeorm").UpdateResult>;
}
