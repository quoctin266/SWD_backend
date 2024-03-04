import { Club } from 'src/module/clubs/entities/club.entity';
import { Event } from 'src/module/events/entities/event.entity';
import { User } from 'src/module/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isLeader: boolean;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Club, { eager: true })
  club: Club;

  @ManyToMany(() => Event, (event) => event.participants)
  joinedEvents: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
