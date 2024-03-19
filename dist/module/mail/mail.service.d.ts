import { Repository } from 'typeorm';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { User } from '../users/entities/user.entity';
import { Member } from '../members/entities/member.entity';
export declare class MailService {
    private vinSlotsRepository;
    private usersRepository;
    private membersRepository;
    constructor(vinSlotsRepository: Repository<VinSlot>, usersRepository: Repository<User>, membersRepository: Repository<Member>);
    getAvailableSlots(): Promise<{
        user: User;
        slots: VinSlot[];
    }[]>;
}
