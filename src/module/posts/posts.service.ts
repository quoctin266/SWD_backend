import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFilterDto } from './dto/filter-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Member } from '../members/entities/member.entity';
import { Comment } from '../comments/entities/comment.entity';
import { NOTFOUND_MEMBER, NOTFOUND_SLOT } from 'src/util/message';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(VinSlot)
    private readonly vinSlotRepository: Repository<VinSlot>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { content, postedBy, vinSlot } = createPostDto;

    const postedByDb: Member = await this.memberRepository.findOne({
      where: { id: postedBy },
    });
    if (!postedByDb) throw new BadRequestException(NOTFOUND_MEMBER);

    const vinSLotDb: VinSlot = await this.vinSlotRepository.findOne({
      where: { id: vinSlot },
    });
    if (!vinSLotDb) throw new BadRequestException(NOTFOUND_SLOT);
  }

  findList(queryObj: PostFilterDto) {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
