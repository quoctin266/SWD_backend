import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Club } from '../clubs/entities/club.entity';
import { EventFilterDto } from './dto/filter-event.dto';
import { Member } from '../members/entities/member.entity';
export declare class EventsService {
    private clubsRepository;
    private eventsRepository;
    private membersRepository;
    constructor(clubsRepository: Repository<Club>, eventsRepository: Repository<Event>, membersRepository: Repository<Member>);
    create(createEventDto: CreateEventDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: EventFilterDto): Promise<{
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
        participants: Member[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
