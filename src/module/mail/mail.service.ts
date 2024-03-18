import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(VinSlot)
    private vinSlotsRepository: Repository<VinSlot>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getAvailableSlots() {
    const slots = (
      await this.vinSlotsRepository.findBy({ status: 'ONGOING' })
    ).slice(0, 3);
    const users = await this.usersRepository.find();

    const data = users.map((user) => {
      return {
        user,
        slots,
      };
    });

    return data;
  }
}
