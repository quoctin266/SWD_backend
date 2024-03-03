import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';
import { CONFLICT_AREA, NOTFOUND_AREA } from 'src/util/message';
import { AreaFilterDto } from './dto/filter-area.dto';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private areasRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const { name } = createAreaDto;

    const existArea = await this.areasRepository.existsBy({ name });
    if (existArea) throw new BadRequestException(CONFLICT_AREA);

    const result = await this.areasRepository.insert(createAreaDto);

    return result.generatedMaps[0];
  }

  async findList(queryObj: AreaFilterDto) {
    const { sortBy, sortDescending, current, pageSize, name } = queryObj;
    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.areasRepository.createQueryBuilder('area');

    if (name) query.andWhere('area.name ILike :name', { name: `%${name}%` });

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['name'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `area.${sortBy}` : '',
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
    const existArea = await this.areasRepository.existsBy({ id });
    if (!existArea) throw new BadRequestException(NOTFOUND_AREA);

    return this.areasRepository.findOneBy({ id });
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const { name } = updateAreaDto;

    const existArea = await this.areasRepository.existsBy({ id });
    if (!existArea) throw new BadRequestException(NOTFOUND_AREA);

    const area = await this.areasRepository.findOneBy({ name });
    if (area && area.id !== id) throw new BadRequestException(CONFLICT_AREA);

    return this.areasRepository.update(id, updateAreaDto);
  }

  async remove(id: number) {
    const existArea = await this.areasRepository.existsBy({ id });
    if (!existArea) throw new BadRequestException(NOTFOUND_AREA);

    return this.areasRepository.softDelete(id);
  }
}
