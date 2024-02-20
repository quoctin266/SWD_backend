import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Area } from 'src/module/areas/entities/area.entity';
import { areaData } from '../jsonData/area';

export class AreaSeeder implements Seeder {
  private readonly logger = new Logger(AreaSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const areasRepository = dataSource.getRepository(Area);

    const count = (await areasRepository.find()).length;
    if (count === 0) {
      await areasRepository.insert(areaData);
      this.logger.log('Run seeding complete');
    }
  }
}
