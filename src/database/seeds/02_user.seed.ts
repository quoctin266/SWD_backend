import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from 'src/module/role/entities/role.entity';
import { User } from 'src/module/users/entities/user.entity';
import { hashPassword } from 'src/module/users/users.service';
import { Logger } from '@nestjs/common';

export class UserSeeder implements Seeder {
  private readonly logger = new Logger(UserSeeder.name);

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(User);
    const rolesRepository = dataSource.getRepository(Role);

    const usersFactory = factoryManager.get(User);

    const count = (await usersRepository.find()).length;
    if (count === 0) {
      // create system admin
      await usersRepository.insert({
        username: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('123456a@'),
        role: await rolesRepository.findOneBy({ name: 'ADMIN' }),
      });

      // create regular users
      const normalUsers = await Promise.all(
        Array(70)
          .fill('')
          .map(async () => {
            const user = await usersFactory.make({
              role: await rolesRepository.findOneBy({ name: 'USER' }),
            });
            return user;
          }),
      );

      // create vinhome member users
      const vinMembers = await Promise.all(
        Array(30)
          .fill('')
          .map(async () => {
            const user = await usersFactory.make({
              role: await rolesRepository.findOneBy({ name: 'VIN_MEMBER' }),
            });
            return user;
          }),
      );

      await usersRepository.save([...normalUsers, ...vinMembers]);

      this.logger.log('Run seeding complete');
    }
  }
}
