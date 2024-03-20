import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { User } from '../users/entities/user.entity';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(VinSlot)
    private vinSlotsRepository: Repository<VinSlot>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}
  async getAvailableSlots() {
    const slots = await this.vinSlotsRepository.findBy({ status: 'ONGOING' });
    const users = await this.usersRepository.find();

    const data = Promise.all(
      users.map(async (user) => {
        const members = await this.membersRepository.findBy({ user });

        const sportTypeName: string[] = [];
        members.forEach((member) => {
          if (member.club.sportType)
            sportTypeName.push(member.club.sportType.name);
        });

        const suitableSlots: VinSlot[] = [];
        slots.forEach((slot) => {
          if (sportTypeName.includes(slot.court.sportType.name))
            suitableSlots.push(slot);
        });

        return {
          user,
          slots: suitableSlots,
        };
      }),
    );

    return data;
  }
}
