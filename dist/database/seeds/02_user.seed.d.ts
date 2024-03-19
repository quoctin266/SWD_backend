import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export declare class UserSeeder implements Seeder {
    private readonly logger;
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any>;
}
