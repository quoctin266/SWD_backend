import { Logger } from '@nestjs/common';
import { Member } from 'src/module/members/entities/member.entity';
import { Post } from 'src/module/posts/entities/post.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { postData } from '../jsonData/post';

export class PostSeeder implements Seeder {
  private readonly logger = new Logger(PostSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    const postRepository = dataSource.getRepository(Post);
    const memberRepository = dataSource.getRepository(Member);
    const vinSlotRepository = dataSource.getRepository(VinSlot);

    const countPost: number = (await postRepository.find()).length;
    const allMembers = await memberRepository.find();
    const allVinSlots = await vinSlotRepository.find();

    if (countPost === 0) {
      if (allMembers.length === 0) {
        this.logger.error('No Member found for seeding Post');
        return;
      }
      const postDbData = postData.map((post) => {
        const postedBy: Member = allMembers.find(
          (member) => member.id === post.postedBy,
        );
        const likes: Member[] = allMembers.filter((member) =>
          post.likes.includes(member.id),
        );
        const vinSlot: VinSlot = allVinSlots.find(
          (vinSlot) => vinSlot.id === post.vinSlot,
        );

        return {
          ...post,
          postedBy,
          likes,
          vinSlot,
        };
      });

      await postRepository.insert(postDbData);
      this.logger.log('Run seeding complete');
    }
  }
}
