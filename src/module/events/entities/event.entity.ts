import { Club } from 'src/module/clubs/entities/club.entity';
import { Member } from 'src/module/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  registrationDeadline: Date;

  @Column()
  status: string;

  @ManyToOne(() => Club)
  club: Club;

  @ManyToMany(() => Member, (member) => member.joinedEvents)
  @JoinTable()
  participants: Member[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
