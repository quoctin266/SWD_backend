import { Club } from 'src/module/clubs/entities/club.entity';
import { Event } from 'src/module/events/entities/event.entity';
import { User } from 'src/module/users/entities/user.entity';
export declare class Member {
    id: number;
    isLeader: boolean;
    user: User;
    club: Club;
    joinedEvents: Event[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
