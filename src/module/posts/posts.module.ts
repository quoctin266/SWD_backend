import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Member } from '../members/entities/member.entity';
import { Comment } from '../comments/entities/comment.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Member, Comment, VinSlot])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
