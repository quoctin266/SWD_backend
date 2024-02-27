import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { SportTypesService } from './sport-types.service';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_SPORT_TYPE,
  DELETE_SPORT_TYPE,
  GET_SPORT_TYPES,
  GET_SPORT_TYPE_DETAIL,
  UPDATE_SPORT_TYPE,
} from 'src/util/message';
import { SportTypeFilterDto } from './dto/filter-sport-type.dto';

@ApiTags('sport types')
@Controller('sport-types')
export class SportTypesController {
  constructor(private readonly sportTypesService: SportTypesService) {}

  @Post()
  @ResponseMessage(CREATE_SPORT_TYPE)
  create(@Body() createSportTypeDto: CreateSportTypeDto) {
    return this.sportTypesService.create(createSportTypeDto);
  }

  @Get()
  @ResponseMessage(GET_SPORT_TYPES)
  findAll(@Query() query: SportTypeFilterDto) {
    return this.sportTypesService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage(GET_SPORT_TYPE_DETAIL)
  findOne(@Param('id') id: number) {
    return this.sportTypesService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_SPORT_TYPE)
  update(
    @Param('id') id: number,
    @Body() updateSportTypeDto: UpdateSportTypeDto,
  ) {
    return this.sportTypesService.update(+id, updateSportTypeDto);
  }

  @Delete(':id')
  @ResponseMessage(DELETE_SPORT_TYPE)
  remove(@Param('id') id: number) {
    return this.sportTypesService.remove(+id);
  }
}
