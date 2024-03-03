import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SportType } from '../sport-types/entities/sport-type.entity';
import { Repository } from 'typeorm';
import { Court } from './entities/court.entity';
import { Area } from '../areas/entities/area.entity';
import {
  CONFLICT_COURT,
  NOTFOUND_AREA,
  NOTFOUND_COURT,
  NOTFOUND_SPORT_TYPE,
} from 'src/util/message';
import { CourtFilterDto } from './dto/filter-court.dto';

@Injectable()
export class CourtsService {
  constructor(
    @InjectRepository(Court)
    private courtsRepository: Repository<Court>,
    @InjectRepository(SportType)
    private sportTypesRepository: Repository<SportType>,
    @InjectRepository(Area)
    private areasRepository: Repository<Area>,
  ) {}

  async create(createCourtDto: CreateCourtDto) {
    const { name, sportTypeId, areaId } = createCourtDto;

    const existCourt = await this.courtsRepository.existsBy({ name });
    if (existCourt) throw new BadRequestException(CONFLICT_COURT);

    const existType = await this.sportTypesRepository.existsBy({
      id: sportTypeId,
    });
    if (!existType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    const existArea = await this.areasRepository.existsBy({ id: areaId });
    if (!existArea) throw new BadRequestException(NOTFOUND_AREA);

    const sportType = await this.sportTypesRepository.findOneBy({
      id: sportTypeId,
    });
    const area = await this.areasRepository.findOneBy({ id: areaId });
    const result = await this.courtsRepository.insert({
      ...createCourtDto,
      sportType,
      area,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: CourtFilterDto) {
    const {
      name,
      isAvailable,
      sportTypeId,
      areaId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.courtsRepository
      .createQueryBuilder('court')
      .leftJoin('court.sportType', 'sportType')
      .leftJoin('court.area', 'area')
      .select(['sportType.name', 'area.name', 'court']);

    if (name) query.andWhere('court.name ILike :name', { name: `%${name}%` });
    if (typeof isAvailable === 'boolean')
      query.andWhere('court.isAvailable = :isAvailable', { isAvailable });
    if (sportTypeId)
      query
        .addSelect('sportType.id')
        .andWhere('sportType.id =:id', { id: sportTypeId });
    if (areaId)
      query.addSelect('area.id').andWhere('area.id =:id', { id: areaId });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['name'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `court.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((club) => {
      return {
        ...club,
        sportType: club.sportType.name,
        area: club.area.name,
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
    const existCourt = await this.courtsRepository.existsBy({ id });
    if (!existCourt) throw new BadRequestException(NOTFOUND_COURT);

    const court = await this.courtsRepository.findOneBy({ id });

    return { ...court, sportType: court.sportType.name, area: court.area.name };
  }

  async update(id: number, updateCourtDto: UpdateCourtDto) {
    const { name, sportTypeId, areaId, ...rest } = updateCourtDto;

    const existCourt = await this.courtsRepository.existsBy({ id });
    if (!existCourt) throw new BadRequestException(NOTFOUND_COURT);

    const court = await this.courtsRepository.findOneBy({ name });
    if (court && court.id !== id) throw new BadRequestException(CONFLICT_COURT);

    const sportType = await this.sportTypesRepository.findOneBy({
      id: sportTypeId,
    });
    if (!sportType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    const area = await this.areasRepository.findOneBy({ id: areaId });
    if (!area) throw new BadRequestException(NOTFOUND_AREA);

    return this.courtsRepository.update(id, {
      ...rest,
      name,
      sportType,
      area,
    });
  }

  async remove(id: number) {
    const existCourt = await this.courtsRepository.existsBy({ id });
    if (!existCourt) throw new BadRequestException(NOTFOUND_COURT);

    return this.courtsRepository.softDelete(id);
  }
}
