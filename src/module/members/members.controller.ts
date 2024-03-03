import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CREATE_MEMBER,
  DELETE_MEMBER,
  GET_MEMBERS,
  GET_MEMBER_DETAIL,
  UPDATE_MEMBER,
} from 'src/util/message';
import { ResponseMessage } from 'src/decorator/customize';
import { MemberFilterDto } from './dto/filter-member.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ResponseMessage(CREATE_MEMBER)
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ResponseMessage(GET_MEMBERS)
  findList(@Query() query: MemberFilterDto) {
    return this.membersService.findList(query);
  }

  @Get(':id')
  @ResponseMessage(GET_MEMBER_DETAIL)
  findOne(@Param('id') id: number) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage(UPDATE_MEMBER)
  update(@Param('id') id: number, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ResponseMessage(DELETE_MEMBER)
  remove(@Param('id') id: number) {
    return this.membersService.remove(+id);
  }
}
