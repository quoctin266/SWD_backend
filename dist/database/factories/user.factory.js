"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../module/users/entities/user.entity");
const users_service_1 = require("../../module/users/users.service");
const typeorm_extension_1 = require("typeorm-extension");
exports.default = (0, typeorm_extension_1.setSeederFactory)(user_entity_1.User, async (faker) => {
    const user = new user_entity_1.User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email({ provider: 'gmail.com' });
    user.password = await (0, users_service_1.hashPassword)('123456a@');
    user.phone = faker.helpers.fromRegExp('0[1-9]{9}');
    user.address = faker.location.streetAddress(true);
    user.dob = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    return user;
});
//# sourceMappingURL=user.factory.js.map