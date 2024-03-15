import { Club } from 'src/module/clubs/entities/club.entity';
import { Member } from 'src/module/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @ManyToOne(() => Member, { nullable: true, eager: true })
  member: Member;

  @ManyToOne(() => Club, { nullable: true, eager: true })
  club: Club;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
