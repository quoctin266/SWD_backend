import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { In, Repository } from 'typeorm';
import { Club } from '../clubs/entities/club.entity';
import {
  CONFLICT_EVENT,
  INVALID_STATUS,
  NOTFOUND_CLUB,
  NOTFOUND_EVENT,
} from 'src/util/message';
import { EventFilterDto } from './dto/filter-event.dto';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { clubId } = createEventDto;

    const club = await this.clubsRepository.findOneBy({
      id: clubId,
    });
    if (!club) throw new BadRequestException(NOTFOUND_CLUB);

    const result = await this.eventsRepository.insert({
      ...createEventDto,
      club,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: EventFilterDto) {
    const {
      name,
      location,
      status,
      memberId,
      clubId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoin('event.club', 'club')
      .leftJoin('event.participants', 'member')
      .select(['club.name', 'member.id', 'event']);

    if (name) query.andWhere('event.name ILike :name', { name: `%${name}%` });
    if (location)
      query.andWhere('event.location ILike :location', {
        location: `%${location}%`,
      });
    if (status) query.andWhere('event.status = :status', { status });
    if (clubId)
      query.addSelect('club.id').andWhere('club.id =:id', { id: clubId });
    if (memberId) query.andWhere('member.id =:id', { id: memberId });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = [
      'name',
      'startDate',
      'endDate',
      'registrationDeadline',
    ];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `event.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((event) => {
      const { participants, ...rest } = event;
      return {
        ...rest,
        club: event.club.name,
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
    const existEvent = await this.eventsRepository.existsBy({ id });
    if (!existEvent) throw new BadRequestException(NOTFOUND_EVENT);

    const event = await this.eventsRepository.findOneBy({ id });

    return {
      ...event,
      club: event.club.name,
    };
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const { name, status, memberIds } = updateEventDto;

    const statusValues = ['ONGOING', 'COMPLETED', 'CANCELED'];
    if (status && !statusValues.includes(status))
      throw new BadRequestException(INVALID_STATUS);

    const existEvent = await this.eventsRepository.existsBy({ id });
    if (!existEvent) throw new BadRequestException(NOTFOUND_EVENT);

    if (name) {
      const event = await this.eventsRepository.findOneBy({ name });
      if (event && event.id !== id)
        throw new BadRequestException(CONFLICT_EVENT);
    }

    if (memberIds) {
      const members = await this.membersRepository.findBy({
        id: In(memberIds),
      });

      const event = await this.eventsRepository.findOneBy({ id });
      event.participants = members;

      await this.eventsRepository.save(event);
    }

    delete updateEventDto.memberIds;
    return this.eventsRepository.update(id, updateEventDto);
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
