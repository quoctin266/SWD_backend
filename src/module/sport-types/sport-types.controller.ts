import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SportTypesService } from './sport-types.service';
import { CreateSportTypeDto } from './dto/create-sport-type.dto';
import { UpdateSportTypeDto } from './dto/update-sport-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sport types')
@Controller('sport-types')
export class SportTypesController {
  constructor(private readonly sportTypesService: SportTypesService) {}

  @Post()
  create(@Body() createSportTypeDto: CreateSportTypeDto) {
    return this.sportTypesService.create(createSportTypeDto);
  }

  @Get()
  findAll() {
    return this.sportTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSportTypeDto: UpdateSportTypeDto,
  ) {
    return this.sportTypesService.update(+id, updateSportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportTypesService.remove(+id);
  }
}
