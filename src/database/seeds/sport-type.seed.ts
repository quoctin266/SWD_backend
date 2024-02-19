import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { SportTypeData } from '../jsonData/sportType';

export class CompanySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const sportTypesRepository = dataSource.getRepository(SportType);

    await sportTypesRepository.insert(SportTypeData);
  }
}
