import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { VinSlotsService } from './vin-slots.service';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_SLOT,
  GET_SLOTS,
  GET_SLOT_DETAIL,
  UPDATE_SLOT,
} from 'src/util/message';
import { VinSlotFilterDto } from './dto/filter-vin-slot.dto';

@ApiTags('vin slots')
@Controller('vin-slots')
export class VinSlotsController {
  constructor(private readonly vinSlotsService: VinSlotsService) {}

  @Post()
  @ResponseMessage(CREATE_SLOT)
  create(@Body() createVinSlotDto: CreateVinSlotDto) {
    return this.vinSlotsService.create(createVinSlotDto);
  }

  @Public()
  @Get()
  @ResponseMessage(GET_SLOTS)
  findList(@Query() query: VinSlotFilterDto) {
    return this.vinSlotsService.findList(query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage(GET_SLOT_DETAIL)
  findOne(@Param('id') id: number) {
    return this.vinSlotsService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_SLOT)
  update(@Param('id') id: number, @Body() updateVinSlotDto: UpdateVinSlotDto) {
    return this.vinSlotsService.update(+id, updateVinSlotDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.vinSlotsService.remove(+id);
  // }
}
