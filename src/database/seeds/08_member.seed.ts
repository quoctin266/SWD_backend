import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { roleData } from '../jsonData/role';
import { Role } from 'src/module/role/entities/role.entity';
import { Logger } from '@nestjs/common';
import { Club } from 'src/module/clubs/entities/club.entity';
import { User } from 'src/module/users/entities/user.entity';
import { Member } from 'src/module/members/entities/member.entity';
import _ from 'lodash';

export class MemeberSeeder implements Seeder {
  private readonly logger = new Logger(MemeberSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const clubsRepository = dataSource.getRepository(Club);
    const usersRepository = dataSource.getRepository(User);
    const membersRepository = dataSource.getRepository(Member);

    const count = (await membersRepository.find()).length;
    if (count === 0) {
      const clubList = await clubsRepository.find();
      const usersList = await usersRepository.find();

      await Promise.all(
        clubList.map(async (club) => {
          // add all users to common club
          if (club.isCommon) {
            return usersList.map(async (user) => {
              return membersRepository.insert({ club, user });
            });
          }

          // choose a random user to be club leader
          const clubLeader = _.sample(usersList);
          membersRepository.insert({ isLeader: true, club, user: clubLeader });

          const randomUsers = _.sampleSize(usersList, 20);

          return randomUsers.map(async (user) => {
            if (user.id !== clubLeader.id)
              return membersRepository.insert({ club, user });
          });
        }),
      );

      this.logger.log('Run seeding complete');
    }
  }
}
