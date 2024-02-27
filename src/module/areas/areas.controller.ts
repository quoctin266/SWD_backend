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
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_AREA,
  DELETE_AREA,
  GET_AREAS,
  GET_AREA_DETAIL,
  UPDATE_AREA,
} from 'src/util/message';
import { AreaFilterDto } from './dto/filter-area.dto';

@ApiTags('areas')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @ResponseMessage(CREATE_AREA)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  @ResponseMessage(GET_AREAS)
  findAll(@Query() query: AreaFilterDto) {
    return this.areasService.findAll(query);
  }

  @Get(':id')
  @ResponseMessage(GET_AREA_DETAIL)
  findOne(@Param('id') id: number) {
    return this.areasService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_AREA)
  update(@Param('id') id: number, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  @ResponseMessage(DELETE_AREA)
  remove(@Param('id') id: number) {
    return this.areasService.remove(+id);
  }
}
