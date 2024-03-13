import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { IUser } from '../users/dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { User } from '../users/entities/user.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import {
  INVALID_STATUS,
  NOTFOUND_APPLICATION,
  NOTFOUND_SLOT,
} from 'src/util/message';
import { ApplicationFilterDto } from './dto/filter-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    @InjectRepository(VinSlot)
    private vinSlotsRepository: Repository<VinSlot>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userId: number, slotId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const club = await this.clubsRepository.findOneBy({ isCommon: true });
    const commonMember = await this.membersRepository.findOneBy({ user, club });
    const vinSlot = await this.vinSlotsRepository.findOneBy({ id: slotId });
    if (!vinSlot) throw new BadRequestException(NOTFOUND_SLOT);

    const result = await this.applicationsRepository.insert({
      vinSlot,
      createdBy: commonMember,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: ApplicationFilterDto) {
    const {
      status,
      memberId,
      vinSlotId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.applicationsRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.vinSlot', 'vinSlot')
      .leftJoinAndSelect('application.createdBy', 'member')
      .leftJoinAndSelect('vinSlot.court', 'court')
      .leftJoinAndSelect('member.user', 'user');

    if (status)
      query.andWhere('application.status ILike :status', {
        status: `%${status}%`,
      });
    if (memberId) query.andWhere('member.id =:id', { id: memberId });
    if (vinSlotId) query.andWhere('vinSlot.id =:id', { id: vinSlotId });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['createdAt'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `application.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((application) => {
      return {
        ...application,
        vinSlot: {
          ...application.vinSlot,
          court: application.vinSlot.court.name,
        },
        createdBy: application.createdBy.user.username,
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
    const application = await this.applicationsRepository.findOneBy({ id });
    if (!application) throw new BadRequestException(NOTFOUND_APPLICATION);

    delete application.vinSlot.createdBy;

    return {
      ...application,
      vinSlot: {
        ...application.vinSlot,
        court: application.vinSlot.court.name,
      },
      createdBy: application.createdBy.user.username,
    };
  }

  async update(id: number, status: string) {
    const existApplication = await this.applicationsRepository.existsBy({ id });
    if (!existApplication) throw new BadRequestException(NOTFOUND_APPLICATION);

    const statusValues = ['PENDING', 'COMPLETED', 'CANCELED'];
    if (status && !statusValues.includes(status))
      throw new BadRequestException(INVALID_STATUS);

    return this.applicationsRepository.update(id, { status });
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
