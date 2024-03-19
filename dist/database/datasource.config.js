"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
exports.typeOrmAsyncConfig = {
    useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        database: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
        factories: ['src/database/factories/*.ts'],
        seeds: ['src/database/seeds/*.ts'],
    }),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=datasource.config.js.map