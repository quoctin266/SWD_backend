import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Event } from 'src/module/events/entities/event.entity';
import { eventData } from '../jsonData/event';
import { Club } from 'src/module/clubs/entities/club.entity';
import _ from 'lodash';

export class EventSeeder implements Seeder {
  private readonly logger = new Logger(EventSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const eventRepository = dataSource.getRepository(Event);
    const clubRepository = dataSource.getRepository(Club);

    const clubsList = await clubRepository.find({ where: { isCommon: false } });

    const count = (await eventRepository.find()).length;
    if (count === 0) {
      const events = eventData.map((event) => {
        // clubs that has sport type matching the event
        const eventClubs = clubsList.filter(
          (item) => item.sportType.name === event.club,
        );

        return {
          ...event,
          club: _.sample(eventClubs),
        };
      });

      await eventRepository.insert(events);
      this.logger.log('Run seeding complete');
    }
  }
}
