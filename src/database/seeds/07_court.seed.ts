import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Area } from 'src/module/areas/entities/area.entity';
import { Court } from 'src/module/courts/entities/court.entity';
import { courtData } from '../jsonData/court';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';

export class CourtSeeder implements Seeder {
  private readonly logger = new Logger(CourtSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const courtsRepository = dataSource.getRepository(Court);
    const areasRepository = dataSource.getRepository(Area);
    const sportTypesRepository = dataSource.getRepository(SportType);

    const count = (await courtsRepository.find()).length;
    if (count === 0) {
      const areaList = await areasRepository.find();
      const sportTypeList = await sportTypesRepository.find();

      const insertData = courtData.map((court) => {
        const area = areaList.find((area) => area.name === court.area);
        const sportType = sportTypeList.find(
          (sportType) => sportType.name === court.sportType,
        );

        return {
          ...court,
          area,
          sportType,
        };
      });

      await courtsRepository.insert(insertData);
      this.logger.log('Run seeding complete');
    }
  }
}
