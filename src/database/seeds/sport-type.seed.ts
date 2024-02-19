import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { SportTypeData } from '../jsonData/sportType';
import { Logger } from '@nestjs/common';

export class CompanySeeder implements Seeder {
  private readonly logger = new Logger(CompanySeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const sportTypesRepository = dataSource.getRepository(SportType);

    const count = (await sportTypesRepository.find()).length;
    if (count === 0) {
      await sportTypesRepository.insert(SportTypeData);
      this.logger.log('Run seeding complete');
    }
  }
}
