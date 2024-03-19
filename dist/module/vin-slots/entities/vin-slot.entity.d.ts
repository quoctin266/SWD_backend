import { Application } from 'src/module/applications/entities/application.entity';
import { Court } from 'src/module/courts/entities/court.entity';
import { Member } from 'src/module/members/entities/member.entity';
export declare class VinSlot {
    id: number;
    capacity: number;
    status: string;
    beginAt: Date;
    endAt: Date;
    court: Court;
    createdBy: Member;
    applications: Application[];
    createdAt: Date;
    updatedAt: Date;
}
