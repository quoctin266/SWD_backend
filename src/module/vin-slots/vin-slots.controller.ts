import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VinSlotsService } from './vin-slots.service';
import { CreateVinSlotDto } from './dto/create-vin-slot.dto';
import { UpdateVinSlotDto } from './dto/update-vin-slot.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  SUCCESS_CREATE_VINSLOT,
  SUCCESS_DELETE_VINSLOT,
  SUCCESS_GET_VINSLOT,
  SUCCESS_UPDATE_VINSLOT,
} from 'src/util/message';

@ApiTags('vin slots')
@Controller('vin-slots')
export class VinSlotsController {
  constructor(private readonly vinSlotsService: VinSlotsService) {}

  @Post()
  @ResponseMessage(SUCCESS_CREATE_VINSLOT)
  create(@Body() createVinSlotDto: CreateVinSlotDto) {
    return this.vinSlotsService.create(createVinSlotDto);
  }

  @Get()
  @ResponseMessage(SUCCESS_GET_VINSLOT)
  findList() {
    return this.vinSlotsService.findList();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS_GET_VINSLOT)
  findOne(@Param('id') id: string) {
    return this.vinSlotsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage(SUCCESS_UPDATE_VINSLOT)
  update(@Param('id') id: string, @Body() updateVinSlotDto: UpdateVinSlotDto) {
    return this.vinSlotsService.update(+id, updateVinSlotDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS_DELETE_VINSLOT)
  remove(@Param('id') id: string) {
    return this.vinSlotsService.remove(+id);
  }
}
