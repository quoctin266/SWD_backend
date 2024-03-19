import { Member } from 'src/module/members/entities/member.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
export declare class Post {
    id: number;
    content: string;
    postedBy: Member;
    likes: Member[];
    vinSlot: VinSlot;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
