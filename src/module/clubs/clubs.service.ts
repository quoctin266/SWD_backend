import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import {
  CONFLICT_CLUB,
  NOTFOUND_CLUB,
  NOTFOUND_SPORT_TYPE,
} from 'src/util/message';
import { SportType } from '../sport-types/entities/sport-type.entity';
import { ClubFilterDto } from './dto/filter-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(SportType)
    private sportTypesRepository: Repository<SportType>,
  ) {}

  async create(createClubDto: CreateClubDto) {
    const { name, email, sportTypeId } = createClubDto;

    const existClub = await this.clubsRepository.exists({
      where: [{ name }, { email }],
    });
    if (existClub) throw new BadRequestException(CONFLICT_CLUB);

    const existType = await this.sportTypesRepository.existsBy({
      id: sportTypeId,
    });
    if (!existType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    const sportType = await this.sportTypesRepository.findOneBy({
      id: sportTypeId,
    });
    const result = await this.clubsRepository.insert({
      ...createClubDto,
      sportType,
    });

    return result.generatedMaps[0];
  }

  async findAll(queryObj: ClubFilterDto) {
    const {
      name,
      email,
      isActive,
      sportTypeId,
      sortBy,
      sortDescending,
      pageSize,
      current,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.clubsRepository
      .createQueryBuilder('club')
      .leftJoin('club.sportType', 'sportType')
      .select(['sportType.name', 'club']);

    if (name) query.andWhere('club.name ILike :name', { name: `%${name}%` });
    if (email)
      query.andWhere('club.email ILike :email', { email: `%${email}%` });
    if (typeof isActive === 'boolean')
      query.andWhere('club.isActive = :isActive', { isActive });
    if (sportTypeId)
      query
        .addSelect('sportType.id')
        .andWhere('sportType.id =:id', { id: sportTypeId });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['name'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `club.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((club) => {
      return {
        ...club,
        sportType: club.sportType.name,
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
    const existClub = await this.clubsRepository.existsBy({ id });
    if (!existClub) throw new BadRequestException(NOTFOUND_CLUB);

    const club = await this.clubsRepository.findOneBy({ id });

    return {
      ...club,
      sportType: club.sportType.name,
    };
  }

  async update(id: number, updateClubDto: UpdateClubDto) {
    const { name } = updateClubDto;

    const existClub = await this.clubsRepository.existsBy({ id });
    if (!existClub) throw new BadRequestException(NOTFOUND_CLUB);

    const club = await this.clubsRepository.findOneBy({ name });
    if (club && club.id !== id) throw new BadRequestException(CONFLICT_CLUB);

    return this.clubsRepository.update(id, updateClubDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
