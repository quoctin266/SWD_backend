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

@ApiTags('vin slots')
@Controller('vin-slots')
export class VinSlotsController {
  constructor(private readonly vinSlotsService: VinSlotsService) {}

  @Post()
  create(@Body() createVinSlotDto: CreateVinSlotDto) {
    return this.vinSlotsService.create(createVinSlotDto);
  }

  @Get()
  findAll() {
    return this.vinSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vinSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVinSlotDto: UpdateVinSlotDto) {
    return this.vinSlotsService.update(+id, updateVinSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vinSlotsService.remove(+id);
  }
}
