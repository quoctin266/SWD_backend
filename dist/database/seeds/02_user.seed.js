"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const role_entity_1 = require("../../module/role/entities/role.entity");
const user_entity_1 = require("../../module/users/entities/user.entity");
const users_service_1 = require("../../module/users/users.service");
const common_1 = require("@nestjs/common");
class UserSeeder {
    constructor() {
        this.logger = new common_1.Logger(UserSeeder.name);
    }
    async run(dataSource, factoryManager) {
        const usersRepository = dataSource.getRepository(user_entity_1.User);
        const rolesRepository = dataSource.getRepository(role_entity_1.Role);
        const usersFactory = factoryManager.get(user_entity_1.User);
        const count = (await usersRepository.find()).length;
        if (count === 0) {
            await usersRepository.insert({
                username: 'admin',
                email: 'admin@gmail.com',
                password: await (0, users_service_1.hashPassword)('123456a@'),
                role: await rolesRepository.findOneBy({ name: 'ADMIN' }),
            });
            const normalUsers = await Promise.all(Array(70)
                .fill('')
                .map(async () => {
                const user = await usersFactory.make({
                    role: await rolesRepository.findOneBy({ name: 'USER' }),
                });
                return user;
            }));
            const vinMembers = await Promise.all(Array(30)
                .fill('')
                .map(async () => {
                const user = await usersFactory.make({
                    role: await rolesRepository.findOneBy({ name: 'VIN_MEMBER' }),
                });
                return user;
            }));
            await usersRepository.save([...normalUsers, ...vinMembers]);
            this.logger.log('Run seeding complete');
        }
    }
}
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=02_user.seed.js.map