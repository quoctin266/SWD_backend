import { Member } from 'src/module/members/entities/member.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
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
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  // PENDING, COMLETED, CANCELED
  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  createdBy: Member;

  @ManyToOne(() => VinSlot, { eager: true })
  vinSlot: VinSlot;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
