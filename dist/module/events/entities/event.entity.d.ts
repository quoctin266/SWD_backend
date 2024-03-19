import { Club } from 'src/module/clubs/entities/club.entity';
import { Member } from 'src/module/members/entities/member.entity';
export declare class Event {
    id: number;
    name: string;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
    status: string;
    club: Club;
    participants: Member[];
    createdAt: Date;
    updatedAt: Date;
}
