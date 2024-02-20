import { User } from 'src/module/users/entities/user.entity';
import { hashPassword } from 'src/module/users/users.service';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.username = faker.internet.userName();
  user.email = faker.internet.email({ provider: 'gmail.com' });
  user.password = await hashPassword('123456a@');
  user.phone = faker.helpers.fromRegExp('0[1-9]{9}');
  user.address = faker.location.streetAddress(true);
  user.dob = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

  return user;
});
