import { Club } from 'src/module/clubs/entities/club.entity';
import { Member } from 'src/module/members/entities/member.entity';
export declare class Wallet {
    id: number;
    balance: number;
    member: Member;
    club: Club;
    createdAt: Date;
    updatedAt: Date;
}
