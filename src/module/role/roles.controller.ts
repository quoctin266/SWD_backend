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
  ROLE_CREATE_SUCCESS,
  ROLE_DELETE_SUCCESS,
  ROLE_LOAD_SUCCESS,
  ROLE_UPDATE_SUCCESS,
} from 'src/util/message';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  @ResponseMessage(ROLE_CREATE_SUCCESS)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  findList() {
    return this.roleService.findList();
  }

  @Get(':id')
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  findOne(@Param('id') id: string) {
    return this.roleService.findOneById(+id);
  }

  @Patch(':id')
  @ResponseMessage(ROLE_UPDATE_SUCCESS)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage(ROLE_DELETE_SUCCESS)
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
