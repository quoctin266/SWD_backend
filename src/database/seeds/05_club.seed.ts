import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Club } from 'src/module/clubs/entities/club.entity';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import {
  badmintonClubData,
  basketballClubData,
  footballClubData,
  tennisClubData,
  volleyballClubData,
} from '../jsonData/club';

export class ClubSeeder implements Seeder {
  private readonly logger = new Logger(ClubSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const clubRepository = dataSource.getRepository(Club);
    const sportTypeRepository = dataSource.getRepository(SportType);

    const count = (await clubRepository.find()).length;
    if (count === 0) {
      // create common club
      await clubRepository.insert({
        name: 'Common',
        email: 'common@gmail.com',
        description: 'Common club for all users',
        isCommon: true,
      });

      // create sport clubs
      const football = await sportTypeRepository.findOneBy({
        name: 'Football',
      });
      footballClubData.forEach((club) => {
        club.sportType = football;
      });

      const basketball = await sportTypeRepository.findOneBy({
        name: 'Basketball',
      });
      basketballClubData.forEach((club) => {
        club.sportType = basketball;
      });

      const badminton = await sportTypeRepository.findOneBy({
        name: 'Badminton',
      });
      badmintonClubData.forEach((club) => {
        club.sportType = badminton;
      });

      const tennis = await sportTypeRepository.findOneBy({ name: 'Tennis' });
      tennisClubData.forEach((club) => {
        club.sportType = tennis;
      });

      const volleyball = await sportTypeRepository.findOneBy({
        name: 'Volleyball',
      });
      volleyballClubData.forEach((club) => {
        club.sportType = volleyball;
      });

      await clubRepository.insert([
        ...footballClubData,
        ...basketballClubData,
        ...badmintonClubData,
        ...tennisClubData,
        ...volleyballClubData,
      ]);
      this.logger.log('Run seeding complete');
    }
  }
}
