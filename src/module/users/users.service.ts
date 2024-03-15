import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  CONFLICT_EMAIL,
  CONFLICT_USERNAME,
  NOTFOUND_USER,
} from 'src/util/message';
import { RolesService } from '../role/roles.service';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { Role } from '../role/entities/role.entity';
import { UserFilterDto } from './dto/filter-user.dto';
import { Wallet } from '../wallets/entities/wallet.entity';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashPW = await hash(password, salt);
  return hashPW;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

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

    const hashPW = await hashPassword(password);

    const role = await this.rolesService.findOneByName('USER');

    const result = await this.usersRepository.insert({
      username,
      email,
      password: hashPW,
      role,
    });

    // add user to common club
    const createdUser = await this.usersRepository.findOneBy({ email });
    const commonClub = await this.clubsRepository.findOne({
      where: { isCommon: true },
    });

    await this.membersRepository.insert({
      user: createdUser,
      club: commonClub,
    });

    // create wallet for user
    const createdMember = await this.membersRepository.findOneBy({
      user: createdUser,
      club: commonClub,
    });

    await this.walletsRepository.insert({
      club: commonClub,
      member: createdMember,
      balance: 50,
    });

    return result.generatedMaps[0];
  }

  async create(createUserDto: CreateUserDto) {
    const { email, roleId, password } = createUserDto;

    const userExist = await this.usersRepository.findOneBy({ email });
    if (userExist) throw new BadRequestException(CONFLICT_EMAIL);

    const role = await this.rolesService.findOneById(roleId);
    const hashPW = await hashPassword(password);

    const result = await this.usersRepository.insert({
      ...createUserDto,
      password: hashPW,
      role,
    });

    // add user to common club
    const createdUser = await this.usersRepository.findOneBy({ email });
    const commonClub = await this.clubsRepository.findOne({
      where: { isCommon: true },
    });

    await this.membersRepository.insert({
      user: createdUser,
      club: commonClub,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: UserFilterDto) {
    const {
      username,
      email,
      phone,
      isActive,
      roleId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    if (username)
      query.andWhere('user.username ILike :username', {
        username: `%${username}%`,
      });
    if (email)
      query.andWhere('user.email ILike :email', {
        email: `%${email}%`,
      });
    if (phone)
      query.andWhere('user.phone ILike :phone', {
        phone: `%${phone}%`,
      });
    if (typeof isActive === 'boolean')
      query.andWhere('user.isActive = :isActive', { isActive });
    if (roleId) query.andWhere('role.id =:id', { id: roleId });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['username', 'email', 'dob'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `user.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((user) => {
      return {
        ...user,
        role: user.role.name,
      };
    });

    return {
      currentPage: defaultPage,
      totalPages: totalPages,
      pageSize: defaultLimit,
      totalItems: totalItems,
      items: data,
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(NOTFOUND_USER);

    return {
      ...user,
      role: user.role.name,
    };
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, roleId, ...rest } = updateUserDto;

    const user = await this.usersRepository.findOneBy({ username });
    if (user && user.id !== id)
      throw new BadRequestException(CONFLICT_USERNAME);

    const role = await this.rolesService.findOneById(roleId);
    if (!role) throw new BadRequestException('Role not found'); // change this later

    let hashPW = '';
    if (password) {
      hashPW = await hashPassword(password);
    }

    const existUser = await this.usersRepository.existsBy({ id });
    if (!existUser) throw new BadRequestException(NOTFOUND_USER);

    return this.usersRepository.update(id, {
      username,
      role,
      password: hashPW,
      ...rest,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
