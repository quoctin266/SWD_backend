import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NOTFOUND_MEMBER,
  NOTFOUND_POST,
  NOTFOUND_SLOT,
} from 'src/util/message';
import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { Member } from '../members/entities/member.entity';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostFilterDto } from './dto/filter-post.dto';
import { ReactionFilterDto } from './dto/filter-reaction.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

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
    const savedPost = await this.postsRepository.insert({
      ...createPostDto,
      postedBy: postedByDb,
      vinSlot: vinSLotDb,
    });
    return savedPost;
  }

  async findList(queryObj: PostFilterDto) {
    const {
      contains,
      postedBy,
      vinSlot,
      current,
      pageSize,
      sortBy,
      sortDescending,
    } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.postedBy', 'member')
      .leftJoinAndSelect('post.likes', 'member')
      .leftJoinAndSelect('post.vinSlot', 'vinSlot');

    if (contains)
      query.andWhere('post.content LIKE :contains', {
        contains: `%${contains}%`,
      });
    if (postedBy)
      query.andWhere('post.postedBy = :postedBy', { postedBy: postedBy });
    if (vinSlot)
      query.andWhere('post.vinSlot = :vinSlot', { vinSlot: vinSlot });

    const numberOfPost: number = await query.getCount();
    const totalPage: number = Math.ceil(numberOfPost / defaultLimit);

    const sortCriteria: string[] = ['createdAt', 'updatedAt'];

    const result = await query
      .orderBy(
        sortCriteria.includes(sortBy) ? `post.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    return {
      currentPage: defaultPage,
      totalPages: totalPage,
      pageSize: defaultLimit,
      totalItems: numberOfPost,
      items: result,
    };
  }

  async findOne(id: number) {
    const post: Post = await this.postsRepository.findOne({
      where: { id },
      relations: ['postedBy', 'vinSlot', 'likes', 'comments'],
    });
    if (!post) throw new NotFoundException(NOTFOUND_POST);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { content, postedBy, vinSlot } = updatePostDto;

    const post: Post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException(NOTFOUND_POST);

    const postedByDb: Member = await this.memberRepository.findOne({
      where: { id: postedBy },
    });
    if (!postedByDb) throw new BadRequestException(NOTFOUND_MEMBER);

    const vinSLotDb: VinSlot = await this.vinSlotRepository.findOne({
      where: { id: vinSlot },
    });
    if (!vinSLotDb) throw new BadRequestException(NOTFOUND_SLOT);

    const updatedPost = await this.postsRepository.update(id, {
      ...updatePostDto,
      postedBy: postedByDb,
      vinSlot: vinSLotDb,
    });
    return updatedPost;
  }

  async remove(id: number) {
    const existingPost: Post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!existingPost) throw new NotFoundException(NOTFOUND_POST);
    return this.postsRepository.softDelete({ id });
  }

  async likePost(postId: number, queryObj: ReactionFilterDto) {
    const { memberId } = queryObj;

    const post: Post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['likes'],
    });
    if (!post) throw new NotFoundException(NOTFOUND_POST);

    const member: Member = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    if (!member) throw new NotFoundException(NOTFOUND_MEMBER);

    const updatedPost: Post = await this.postsRepository.save({
      ...post,
      likes: [...post.likes, member],
    });
    return updatedPost;
  }
}
