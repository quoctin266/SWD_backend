import { Member } from 'src/module/members/entities/member.entity';
import { Post } from 'src/module/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Member)
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  createdBy: Member;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
