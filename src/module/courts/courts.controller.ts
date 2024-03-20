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
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import {
  COUNT_COURT,
  CREATE_COURT,
  DELETE_COURT,
  GET_COURTS,
  GET_COURT_DETAIL,
  UPDATE_COURT,
} from 'src/util/message';
import { CourtFilterDto } from './dto/filter-court.dto';
import { CourtCountFilterDto } from './dto/filter-count.dto';

@ApiTags('courts')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  @ResponseMessage(CREATE_COURT)
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.create(createCourtDto);
  }

  @Get('count')
  @ResponseMessage(COUNT_COURT)
  count(@Query() query: CourtCountFilterDto) {
    return this.courtsService.count(query);
  }

  @Public()
  @Get()
  @ResponseMessage(GET_COURTS)
  findList(@Query() query: CourtFilterDto) {
    return this.courtsService.findList(query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage(GET_COURT_DETAIL)
  findOne(@Param('id') id: number) {
    return this.courtsService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_COURT)
  update(@Param('id') id: number, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtsService.update(+id, updateCourtDto);
  }

  @Delete(':id')
  @ResponseMessage(DELETE_COURT)
  remove(@Param('id') id: number) {
    return this.courtsService.remove(+id);
  }
}
