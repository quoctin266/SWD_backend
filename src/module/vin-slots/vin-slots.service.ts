import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VinSlot } from './entities/vin-slot.entity';
import { Between, Repository } from 'typeorm';
import { Court } from '../courts/entities/court.entity';
import { Member } from '../members/entities/member.entity';
import {
  CONFLICT_SLOT,
  INVALID_CAPACITY,
  INVALID_STATUS,
  NOTFOUND_COURT,
  NOTFOUND_MEMBER,
  NOTFOUND_SLOT,
} from 'src/util/message';
import moment from 'moment';
import { VinSlotFilterDto } from './dto/filter-vin-slot.dto';

@Injectable()
export class VinSlotsService {
  constructor(
    @InjectRepository(VinSlot)
    private vinSlotsRepository: Repository<VinSlot>,
    @InjectRepository(Court)
    private courtsRepository: Repository<Court>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createVinSlotDto: CreateVinSlotDto) {
    const { beginAt, endAt, capacity, courtId, memberId } = createVinSlotDto;

    const court = await this.courtsRepository.findOneBy({
      id: courtId,
      isAvailable: true,
    });
    if (!court) throw new BadRequestException(NOTFOUND_COURT);

    const member = await this.membersRepository.findOneBy({ id: memberId });
    if (!member) throw new BadRequestException(NOTFOUND_MEMBER);

    const slot = await this.vinSlotsRepository.findOne({
      where: [
        {
          court,
          beginAt: Between(moment(beginAt).toDate(), moment(endAt).toDate()),
        },
        {
          court,
          endAt: Between(moment(beginAt).toDate(), moment(endAt).toDate()),
        },
      ],
    });
    if (slot) throw new BadRequestException(CONFLICT_SLOT);

    const result = await this.vinSlotsRepository.insert({
      beginAt,
      endAt,
      capacity,
      court,
      createdBy: member,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: VinSlotFilterDto) {
    const {
      status,
      createdBy,
      courtId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.vinSlotsRepository
      .createQueryBuilder('vinSlot')
      .leftJoinAndSelect('vinSlot.court', 'court')
      .leftJoinAndSelect('court.sportType', 'sportType')
      .leftJoinAndSelect('vinSlot.createdBy', 'member')
      .leftJoinAndSelect('member.user', 'user')
      .leftJoinAndSelect('member.club', 'club');

    if (status)
      query.andWhere('vinSlot.status ILike :status', { status: `%${status}%` });
    if (courtId) query.andWhere('court.id =:id', { id: courtId });
    if (createdBy) query.andWhere('member.id =:id', { id: createdBy });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['capacity', 'beginAt', 'endAt'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `vinSlot.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((slot) => {
      return {
        ...slot,
        court: {
          name: slot.court.name,
          type: slot.court.sportType.name,
        },
        createdBy: {
          username: slot.createdBy.user.username,
          club: slot.createdBy.club.name,
        },
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
    const slot = await this.vinSlotsRepository.findOneBy({ id });
    if (!slot) throw new BadRequestException(NOTFOUND_SLOT);

    return {
      ...slot,
      court: {
        name: slot.court.name,
        type: slot.court.sportType.name,
      },
      createdBy: {
        username: slot.createdBy.user.username,
        club: slot.createdBy.club.name,
      },
    };
  }

  async update(id: number, updateVinSlotDto: UpdateVinSlotDto) {
    const { beginAt, endAt, capacity, status, courtId } = updateVinSlotDto;

    const court = await this.courtsRepository.findOneBy({
      id: courtId,
      isAvailable: true,
    });
    if (!court) throw new BadRequestException(NOTFOUND_COURT);

    const statusValues = ['ONGOING', 'COMPLETED', 'CANCELED'];
    if (status && !statusValues.includes(status))
      throw new BadRequestException(INVALID_STATUS);

    const slot = await this.vinSlotsRepository.findOneBy({ id });
    if (!slot) throw new BadRequestException(NOTFOUND_SLOT);

    if (capacity < slot.applications.length)
      throw new BadRequestException(INVALID_CAPACITY);

    const existSlot = await this.vinSlotsRepository.findOne({
      where: [
        {
          court,
          beginAt: Between(moment(beginAt).toDate(), moment(endAt).toDate()),
        },
        {
          court,
          endAt: Between(moment(beginAt).toDate(), moment(endAt).toDate()),
        },
      ],
    });
    if (existSlot) throw new BadRequestException(CONFLICT_SLOT);

    return this.vinSlotsRepository.update(id, {
      beginAt,
      endAt,
      status,
      capacity,
      court,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} vinSlot`;
  }
}
