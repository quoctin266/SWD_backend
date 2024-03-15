import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postedBy: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  vinSlot: number;
}
