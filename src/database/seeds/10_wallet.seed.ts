import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Wallet } from 'src/module/wallets/entities/wallet.entity';
import { Club } from 'src/module/clubs/entities/club.entity';
import { Member } from 'src/module/members/entities/member.entity';

export class WalletSeeder implements Seeder {
  private readonly logger = new Logger(WalletSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const walletsRepository = dataSource.getRepository(Wallet);
    const clubsRepository = dataSource.getRepository(Club);
    const membersRepository = dataSource.getRepository(Member);

    const count = (await walletsRepository.find()).length;
    if (count === 0) {
      const allClubsList = await clubsRepository.find();

      const commonClub = allClubsList.find((club) => club.isCommon === true);
      const commonMembersList = await membersRepository.findBy({
        club: commonClub,
      });

      // insert clubs wallet data
      await Promise.all(
        allClubsList.map(async (club) => {
          // random 50 - 150 point
          const balance = Math.floor(Math.random() * (150 - 50 + 1) + 50);
          return walletsRepository.insert({ balance, club });
        }),
      );

      // insert members wallet data
      await Promise.all(
        commonMembersList.map(async (member) => {
          // random 0 - 50 point
          const balance = Math.floor(Math.random() * (50 - 0 + 1) + 0);
          return walletsRepository.insert({
            balance,
            member,
            club: commonClub,
          });
        }),
      );

      this.logger.log('Run seeding complete');
    }
  }
}
