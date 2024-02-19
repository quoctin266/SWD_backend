import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { roleData } from '../jsonData/role';
import { Role } from 'src/module/role/entities/role.entity';
import { Logger } from '@nestjs/common';

export class RoleSeeder implements Seeder {
  private readonly logger = new Logger(RoleSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource.getRepository(Role);

    const count = (await roleRepository.find()).length;
    if (count === 0) {
      await roleRepository.insert(roleData);
      this.logger.log('Run seeding complete');
    }
  }
}
