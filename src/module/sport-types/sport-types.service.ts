import { Injectable } from '@nestjs/common';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';

@Injectable()
export class SportTypesService {
  create(createSportTypeDto: CreateSportTypeDto) {
    return 'This action adds a new sportType';
  }

  findAll() {
    return `This action returns all sportTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sportType`;
  }

  update(id: number, updateSportTypeDto: UpdateSportTypeDto) {
    return `This action updates a #${id} sportType`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportType`;
  }
}
