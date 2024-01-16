import { Court } from 'src/module/courts/entities/court.entity';
import { Member } from 'src/module/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class VinSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  status: string;

  @Column()
  beginAt: Date;

  @Column()
  endAt: Date;

  @ManyToOne(() => Court)
  court: Court;

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
}
