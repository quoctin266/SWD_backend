import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
export declare class CourtSeeder implements Seeder {
    private readonly logger;
    run(dataSource: DataSource): Promise<any>;
}
