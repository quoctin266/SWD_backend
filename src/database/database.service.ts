import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}
  async onModuleInit() {
    await runSeeders(this.dataSource);
  }
}
