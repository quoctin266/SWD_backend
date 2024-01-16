import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';

// for connecting to database
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
    // migrationsRun: true,
    // migrations: [join(__dirname, 'migration', '*.{ts,js}')],
    // factories: ['src/factories/*.ts'],
    // seeds: ['src/seeder/*.ts'],
  }),
  inject: [ConfigService],
};

// for manually migrating and seeding
// const dbConfig: DataSourceOptions & SeederOptions = {
//   type: 'mysql' as const,
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   entities: [Company, User, Role, Job],
//   synchronize: true,
//   migrationsRun: true,
//   migrations: ['src/migration/*.ts'],
//   factories: ['src/factories/*.ts'],
//   seeds: ['src/seeder/*.ts'],
// };

// export default new DataSource(dbConfig);
