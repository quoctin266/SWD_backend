import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_EVENT,
  GET_EVENTS,
  GET_EVENT_DETAIL,
  UPDATE_EVENT,
} from 'src/util/message';
import { EventFilterDto } from './dto/filter-event.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ResponseMessage(CREATE_EVENT)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Public()
  @Get()
  @ResponseMessage(GET_EVENTS)
  findList(@Query() query: EventFilterDto) {
    return this.eventsService.findList(query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage(GET_EVENT_DETAIL)
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_EVENT)
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
