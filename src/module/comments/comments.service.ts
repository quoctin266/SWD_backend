import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { Member } from '../members/entities/member.entity';
import {
  FAIL_CREATE_COMMENT,
  FAIL_UPDATE_COMMENT,
  NOTFOUND_COMMENT,
  NOTFOUND_MEMBER,
  NOTFOUND_POST,
} from 'src/util/message';
import { Comment } from './entities/comment.entity';
import { CommentFilterDto } from './dto/filter-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { content, postId, createdBy } = createCommentDto;

    const post: Post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) throw new BadRequestException(NOTFOUND_POST);

    const createdByDb: Member = await this.membersRepository.findOne({
      where: { id: createdBy },
    });
    if (!createdByDb) throw new BadRequestException(NOTFOUND_MEMBER);

    const comment = await this.commentsRepository.insert({
      likes: 0,
      content,
      post,
      createdBy: createdByDb,
    });

    if (!comment) throw new BadRequestException(FAIL_CREATE_COMMENT);
    return comment.generatedMaps;
  }

  async findList(queryObj: CommentFilterDto) {
    const { postId, createdBy, current, pageSize, sortBy, sortDescending } =
      queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.createdBy', 'createdBy');

    if (createdBy) {
      query.andWhere('comment.createdBy = :createdBy', { createdBy });
    }
    if (postId) {
      query.andWhere('comment.post = :postId', { postId });
    }

    const numberOfComment: number = (await query.getMany()).length;
    const totalPage: number = Math.ceil(numberOfComment / defaultLimit);

    const sortCriteria: string[] = ['createdAt', 'updatedAt', 'id'];

    const result = await query
      .orderBy(
        sortCriteria.includes(sortBy) ? `comment.${sortBy}` : 'comment.id',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    return {
      currentPage: defaultPage,
      totalPages: totalPage,
      pageSize: defaultLimit,
      totalItems: numberOfComment,
      items: result,
    };
  }

  async findOne(id: number) {
    const comment: Comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['post', 'createdBy'],
    });
    if (!comment) throw new BadRequestException(NOTFOUND_COMMENT);

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const existingComment: Comment = await this.commentsRepository.findOne({
      where: { id },
    });
    if (!existingComment) throw new BadRequestException(NOTFOUND_COMMENT);

    const post: Post = await this.postsRepository.findOne({
      where: { id: updateCommentDto.postId },
    });
    if (!post) throw new BadRequestException(NOTFOUND_POST);

    const createdBy: Member = await this.membersRepository.findOne({
      where: { id: updateCommentDto.createdBy },
    });
    if (!createdBy) throw new BadRequestException(NOTFOUND_MEMBER);

    if (updateCommentDto.likes) {
      if (updateCommentDto.likes - existingComment.likes > 1)
        throw new BadRequestException(FAIL_UPDATE_COMMENT);
      else if (existingComment.likes - updateCommentDto.likes > 1)
        throw new BadRequestException(FAIL_UPDATE_COMMENT);
    }

    const comment = await this.commentsRepository.update(id, {
      content: updateCommentDto.content,
      post,
      createdBy,
      likes: updateCommentDto.likes,
    });
    return comment;
  }

  async remove(id: number) {
    const existingComment: Comment = await this.commentsRepository.findOne({
      where: { id },
    });
    if (!existingComment) throw new BadRequestException(NOTFOUND_COMMENT);
    return this.commentsRepository.softDelete(existingComment);
  }
}
