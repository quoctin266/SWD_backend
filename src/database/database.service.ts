import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { DataSource, Repository } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);

  constructor(
    @InjectRepository(SportType)
    private sportTypesRepository: Repository<SportType>,
    private dataSource: DataSource,
  ) {}
  async onModuleInit() {
    // change this later
    const count = (await this.sportTypesRepository.find()).length;

    if (count === 0) {
      await runSeeders(this.dataSource);
      this.logger.log('Run seeding complete');
    } else this.logger.log('No seeding were run');
  }
}
