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
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_CLUB,
  GET_CLUBS,
  GET_CLUB_DETAIL,
  UPDATE_CLUB,
} from 'src/util/message';
import { ClubFilterDto } from './dto/filter-club.dto';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @ResponseMessage(CREATE_CLUB)
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @Public()
  @Get()
  @ResponseMessage(GET_CLUBS)
  findList(@Query() query: ClubFilterDto) {
    return this.clubsService.findList(query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage(GET_CLUB_DETAIL)
  findOne(@Param('id') id: number) {
    return this.clubsService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_CLUB)
  update(@Param('id') id: number, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(+id, updateClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(+id);
  }
}
