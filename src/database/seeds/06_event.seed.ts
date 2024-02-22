import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Event } from 'src/module/events/entities/event.entity';
import { eventData } from '../jsonData/event';
import { Club } from 'src/module/clubs/entities/club.entity';

export class EventSeeder implements Seeder {
  private readonly logger = new Logger(EventSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    console.log(eventData.length);
    const eventRepository = dataSource.getRepository(Event);
    const clubRepository = dataSource.getRepository(Club);

    const clubsList = await clubRepository.find();

    const count = (await eventRepository.find()).length;
    if (count === 0) {
      const events = eventData.map((event) => {
        const club = clubsList.find((item) => item.name === event.club);
        return {
          ...event,
          club,
        };
      });
      await eventRepository.insert(events);
      this.logger.log('Run seeding complete');
    }
  }
}
