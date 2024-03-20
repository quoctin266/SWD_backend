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
  UseGuards,
  SetMetadata,
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
import { AuthorizationGuard } from '../auth/guard/authorization.guard';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage(PERMISSION_CREATE_SUCCESS)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage(PERMISSION_LOAD_SUCCESS)
  findList(@Query('roleId') roleId?: string) {
    return this.permissionsService.findList(+roleId ?? null);
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
