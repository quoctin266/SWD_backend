import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  createdBy: number;
}
