import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  SUCCESS_CREATE_ROLE,
  SUCCESS_DELETE_ROLE,
  SUCCESS_GET_ROLE,
  SUCCESS_UPDATE_ROLE,
} from 'src/util/message';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  @ResponseMessage(SUCCESS_CREATE_ROLE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage(SUCCESS_GET_ROLE)
  findList() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS_GET_ROLE)
  findOne(@Param('id') id: string) {
    return this.roleService.findOneById(+id);
  }

  @Patch(':id')
  @ResponseMessage(SUCCESS_UPDATE_ROLE)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS_DELETE_ROLE)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
