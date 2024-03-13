import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorator/customize';
import {
  CREATE_USER,
  GET_USERS,
  GET_USER_DETAIL,
  UPDATE_USER,
} from 'src/util/message';
import { UserFilterDto } from './dto/filter-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage(CREATE_USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage(GET_USERS)
  findList(@Query() query: UserFilterDto) {
    return this.usersService.findList(query);
  }

  @Get(':id')
  @ResponseMessage(GET_USER_DETAIL)
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(UPDATE_USER)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.usersService.remove(+id);
  // }
}
