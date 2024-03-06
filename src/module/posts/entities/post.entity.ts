import { Member } from 'src/module/members/entities/member.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
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
  JoinTable,
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
  @JoinTable()
  likes: Member[];

  @ManyToOne(() => VinSlot)
  vinSlot: VinSlot;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
