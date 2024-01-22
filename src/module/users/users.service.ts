import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { CONFLICT_EMAIL } from 'src/util/message';
import { RolesService } from '../role/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async hashPassword(password: string) {
    const salt = await genSalt(10);
    const hashPW = await hash(password, salt);
    return hashPW;
  }

  async checkPassword(hash: string, password: string) {
    return await compare(password, hash);
  }

  async updateUserToken(refreshToken: string, userId: number) {
    return await this.usersRepository.update(userId, {
      refreshToken,
    });
  }

  async registerUser(registerUserDTO: RegisterUserDto) {
    const { username, email, password } = registerUserDTO;

    const user = await this.usersRepository.findOneBy({
      email,
    });
    if (user) throw new ConflictException(CONFLICT_EMAIL);

    const hashPW = await this.hashPassword(password);

    const role = await this.rolesService.findOneByName('USER');

    const result = await this.usersRepository.insert({
      username,
      email,
      password: hashPW,
      role,
    });

    return result.generatedMaps[0];
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByToken(refreshToken: string) {
    return this.usersRepository.findOneBy({ refreshToken });
  }

  findOneByEmail(email: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
