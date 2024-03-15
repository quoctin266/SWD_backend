import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  likes?: number;
}
