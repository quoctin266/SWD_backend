import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  PERMISSION_CREATE_SUCCESS,
  PERMISSION_DELETE_SUCCESS,
  PERMISSION_LOAD_SUCCESS,
  PERMISSION_UPDATE_SUCCESS,
} from 'src/util/message';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage(PERMISSION_CREATE_SUCCESS)
  @ResponseMessage(PERMISSION_CREATE_SUCCESS)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage(PERMISSION_LOAD_SUCCESS)
  findAll(@Query('roleId', ParseIntPipe) roleId?: number) {
    return this.permissionsService.findAll(roleId ?? null);
  }

  @Get(':id')
  @ResponseMessage(PERMISSION_LOAD_SUCCESS)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage(PERMISSION_UPDATE_SUCCESS)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ResponseMessage(PERMISSION_DELETE_SUCCESS)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
