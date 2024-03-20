import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import {
  SUCCESS_CREATE_COMMENT,
  SUCCESS_DELETE_COMMENT,
  SUCCESS_GET_COMMENT,
  SUCCESS_UPDATE_COMMENT,
} from 'src/util/message';
import { CommentFilterDto } from './dto/filter-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ResponseMessage(SUCCESS_CREATE_COMMENT)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Public()
  @Get()
  @ResponseMessage(SUCCESS_GET_COMMENT)
  findList(@Query() query: CommentFilterDto) {
    return this.commentsService.findList(query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage(SUCCESS_GET_COMMENT)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage(SUCCESS_UPDATE_COMMENT)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS_DELETE_COMMENT)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
