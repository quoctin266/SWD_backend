import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from '../users/dto/users.dto';
import {
  CREATE_APPLICATION,
  GET_APPLICATIONS,
  GET_APPLICATION_DETAIL,
  UPDATE_APPLICATION,
} from 'src/util/message';
import { ApplicationFilterDto } from './dto/filter-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ResponseMessage(CREATE_APPLICATION)
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @User() user: IUser,
  ) {
    const { slotId } = createApplicationDto;
    return this.applicationsService.create(user.id, slotId);
  }

  @Get()
  @ResponseMessage(GET_APPLICATIONS)
  findList(@Query() query: ApplicationFilterDto) {
    return this.applicationsService.findList(query);
  }

  @Get(':id')
  @ResponseMessage(GET_APPLICATION_DETAIL)
  findOne(@Param('id') id: number) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage(UPDATE_APPLICATION)
  update(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    const { status } = updateApplicationDto;
    return this.applicationsService.update(+id, status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationsService.remove(+id);
  // }
}
