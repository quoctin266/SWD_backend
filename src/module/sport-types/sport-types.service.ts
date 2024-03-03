import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SportType } from './entities/sport-type.entity';
import { Repository } from 'typeorm';
import { CONFLICT_SPORT_TYPE, NOTFOUND_SPORT_TYPE } from 'src/util/message';
import { SportTypeFilterDto } from './dto/filter-sport-type.dto';

@Injectable()
export class SportTypesService {
  constructor(
    @InjectRepository(SportType)
    private sportTypesRepository: Repository<SportType>,
  ) {}

  async create(createSportTypeDto: CreateSportTypeDto) {
    const { name } = createSportTypeDto;

    const existType = await this.sportTypesRepository.existsBy({ name });
    if (existType) throw new BadRequestException(CONFLICT_SPORT_TYPE);

    const result = await this.sportTypesRepository.insert(createSportTypeDto);

    return result.generatedMaps[0];
  }

  async findList(queryObj: SportTypeFilterDto) {
    const { sortBy, sortDescending, current, pageSize, name } = queryObj;
    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.sportTypesRepository.createQueryBuilder('sportType');

    if (name)
      query.andWhere('sportType.name ILike :name', { name: `%${name}%` });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['name'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `sportType.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    return {
      currentPage: defaultPage,
      totalPages: totalPages,
      pageSize: defaultLimit,
      totalItems: totalItems,
      items: result,
    };
  }

  async findOne(id: number) {
    const existType = await this.sportTypesRepository.existsBy({ id });
    if (!existType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    return this.sportTypesRepository.findOneBy({ id });
  }

  async update(id: number, updateSportTypeDto: UpdateSportTypeDto) {
    const { name } = updateSportTypeDto;

    const existType = await this.sportTypesRepository.existsBy({ id });
    if (!existType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    const sportType = await this.sportTypesRepository.findOneBy({ name });
    if (sportType && sportType.id !== id)
      throw new BadRequestException(CONFLICT_SPORT_TYPE);

    return this.sportTypesRepository.update(id, updateSportTypeDto);
  }

  async remove(id: number) {
    const existType = await this.sportTypesRepository.existsBy({ id });
    if (!existType) throw new BadRequestException(NOTFOUND_SPORT_TYPE);

    return this.sportTypesRepository.softDelete(id);
  }
}
