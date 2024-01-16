import { Member } from 'src/module/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Member)
  @JoinColumn({
    name: 'postedBy',
    referencedColumnName: 'id',
  })
  postedBy: Member;

  @ManyToMany(() => Member)
  @JoinColumn()
  likes: Member[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
