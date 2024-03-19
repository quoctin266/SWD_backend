import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: EventFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            club: string;
            id: number;
            name: string;
            location: string;
            description: string;
            startDate: Date;
            endDate: Date;
            registrationDeadline: Date;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        club: string;
        id: number;
        name: string;
        location: string;
        description: string;
        startDate: Date;
        endDate: Date;
        registrationDeadline: Date;
        status: string;
        participants: import("../members/entities/member.entity").Member[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
}
