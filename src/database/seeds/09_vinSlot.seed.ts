import { DataSource, Not } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
import { generateSlots } from '../jsonData/vinSlots';
import { Court } from 'src/module/courts/entities/court.entity';
import { Member } from 'src/module/members/entities/member.entity';
import _ from 'lodash';
import { Club } from 'src/module/clubs/entities/club.entity';

export class VinSlotSeeder implements Seeder {
  private readonly logger = new Logger(VinSlotSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const vinSlotsRepository = dataSource.getRepository(VinSlot);
    const courtsRepository = dataSource.getRepository(Court);
    const membersRepository = dataSource.getRepository(Member);
    const clubsRepository = dataSource.getRepository(Club);

    const count = (await vinSlotsRepository.find()).length;
    if (count === 0) {
      const commonClub = await clubsRepository.findOneBy({ isCommon: true });
      const courtList = await courtsRepository.findBy({ isAvailable: true });
      const memberList = await membersRepository.findBy({
        club: Not(commonClub.id),
      });

      const slotTimes = generateSlots();
      const slotsData = slotTimes.map((slot) => {
        const court = _.sample(courtList);
        const createdBy = _.sample(memberList);

        return {
          ...slot,
          court,
          createdBy,
        };
      });

      await vinSlotsRepository.insert(slotsData);
      this.logger.log('Run seeding complete');
    }
  }
}
