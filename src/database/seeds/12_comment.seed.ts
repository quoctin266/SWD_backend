import { Logger } from '@nestjs/common';
import { Comment } from 'src/module/comments/entities/comment.entity';
import { Member } from 'src/module/members/entities/member.entity';
import { Post } from 'src/module/posts/entities/post.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { commentData } from '../jsonData/comment';

export class CommentSeeder implements Seeder {
  private readonly logger = new Logger(CommentSeeder.name);

  async run(dataSource: DataSource): Promise<any> {
    const postRepository = dataSource.getRepository(Post);
    const memberRepository = dataSource.getRepository(Member);
    const commentRepository = dataSource.getRepository(Comment);

    const countComment: number = (await commentRepository.find()).length;
    const allPosts = await postRepository.find();
    const allMembers = await memberRepository.find();

    if (countComment === 0) {
      if (allMembers.length === 0) {
        this.logger.error('No Member found for seeding Comment');
        return;
      }
      const commentDbData = commentData.map((comment) => {
        const post: Post = allPosts.find((post) => post.id === comment.post);
        const createdBy: Member = allMembers.find(
          (member) => member.id === comment.createdBy,
        );

        return {
          ...comment,
          post,
          createdBy,
        };
      });

      await commentRepository.insert(commentDbData);
      this.logger.log('Run seeding complete');
    }
  }
}
