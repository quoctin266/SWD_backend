import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../clubs/entities/club.entity';
import { User } from '../users/entities/user.entity';
import { Member } from './entities/member.entity';
import {
  NOTFOUND_CLUB,
  NOTFOUND_MEMBER,
  NOTFOUND_USER,
} from 'src/util/message';
import { MemberFilterDto } from './dto/filter-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const { userId, clubId } = createMemberDto;
    const club = await this.clubsRepository.findOneBy({ id: clubId });
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!club) throw new BadRequestException(NOTFOUND_CLUB);
    if (!user) throw new BadRequestException(NOTFOUND_USER);

    const result = await this.membersRepository.insert({ club: club, user });

    return result.generatedMaps[0];
  }

  async findList(queryObj: MemberFilterDto) {
    const {
      isLeader,
      eventId,
      clubId,
      userId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.membersRepository
      .createQueryBuilder('member')
      .leftJoin('member.club', 'club')
      .leftJoin('member.user', 'user')
      .leftJoin('member.joinedEvents', 'event')
      .select(['club.name', 'user.username', 'event.id', 'member']);

    if (typeof isLeader === 'boolean')
      query.andWhere('member.isLeader = :isLeader', { isLeader });
    if (eventId) query.andWhere('event.id =:id', { id: eventId });
    if (clubId)
      query.addSelect('club.id').andWhere('club.id =:id', { id: clubId });
    if (userId)
      query.addSelect('user.id').andWhere('user.id =:id', { id: userId });
    else query.andWhere('club.name != :name', { name: 'Common' });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['createdAt'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `member.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((member) => {
      const { joinedEvents, ...rest } = member;
      return {
        ...rest,
        club: member.club.name,
        user: member.user.username,
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
    const existMember = await this.membersRepository.existsBy({ id });
    if (!existMember) throw new BadRequestException(NOTFOUND_MEMBER);

    const member = await this.membersRepository.findOneBy({ id });

    return { ...member, user: member.user.username, club: member.club.name };
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const existMember = await this.membersRepository.existsBy({ id });
    if (!existMember) throw new BadRequestException(NOTFOUND_MEMBER);

    return this.membersRepository.update(id, updateMemberDto);
  }

  async remove(id: number) {
    const existMember = await this.membersRepository.existsBy({ id });
    if (!existMember) throw new BadRequestException(NOTFOUND_MEMBER);

    return this.membersRepository.softDelete(id);
  }
}
