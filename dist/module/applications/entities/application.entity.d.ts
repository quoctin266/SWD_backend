import { Member } from 'src/module/members/entities/member.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
export declare class Application {
    id: number;
    status: string;
    createdBy: Member;
    vinSlot: VinSlot;
    createdAt: Date;
    updatedAt: Date;
}
