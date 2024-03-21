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
import { CourtCountFilterDto } from './dto/filter-count.dto';
import { FilesService } from '../files/files.service';
import { UploadFileDto } from '../files/dto/upload-file.dto';
import { File } from '../files/entities/file.entity';

@Injectable()
export class CourtsService {
  constructor(
    @InjectRepository(Court)
    private courtsRepository: Repository<Court>,
    @InjectRepository(SportType)
    private sportTypesRepository: Repository<SportType>,
    @InjectRepository(Area)
    private areasRepository: Repository<Area>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private filesService: FilesService,
  ) {}

  async create(
    uploadedFile: Express.Multer.File,
    createCourtDto: CreateCourtDto,
  ) {
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

    const { file, ...data } = createCourtDto;

    const metadata: UploadFileDto = {
      folderName: '',
      folderType: '',
    };

    const uploadResult = await this.filesService.create(metadata, uploadedFile);
    const createdFile = await this.filesRepository.findOneBy({
      id: uploadResult.id,
    });

    const result = await this.courtsRepository.insert({
      ...data,
      sportType,
      area,
      file: createdFile,
    });

    return result.generatedMaps[0];
  }

  async count(queryObj: CourtCountFilterDto) {
    const { year, top } = queryObj;

    const courts = await this.courtsRepository
      .createQueryBuilder('court')
      .leftJoinAndSelect('court.vinSlots', 'vinSlot')
      .andWhere(
        'EXTRACT(YEAR FROM vinSlot.createdAt) = :year OR vinSlot.createdAt IS NULL',
        { year },
      )
      .getMany();

    const result = courts
      .map((court) => {
        return {
          ...court,
          vinSlots: court.vinSlots.length,
        };
      })
      .sort((a, b) => b.vinSlots - a.vinSlots)
      .slice(0, top);

    return result;
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
      .leftJoin('court.file', 'file')
      .select(['sportType.name', 'file.url', 'area.name', 'court']);

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

  async update(
    id: number,
    updateCourtDto: UpdateCourtDto,
    uploadedFile: Express.Multer.File,
  ) {
    const { name, sportTypeId, areaId, file, ...rest } = updateCourtDto;

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

    const metadata: UploadFileDto = {
      folderName: '',
      folderType: '',
    };

    const uploadResult = await this.filesService.create(metadata, uploadedFile);
    const createdFile = await this.filesRepository.findOneBy({
      id: uploadResult.id,
    });

    return this.courtsRepository.update(id, {
      ...rest,
      name,
      sportType,
      area,
      file: createdFile,
    });
  }

  async remove(id: number) {
    const existCourt = await this.courtsRepository.existsBy({ id });
    if (!existCourt) throw new BadRequestException(NOTFOUND_COURT);

    return this.courtsRepository.softDelete(id);
  }
}
