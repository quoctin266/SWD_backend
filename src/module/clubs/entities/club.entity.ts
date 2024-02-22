import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isCommon: boolean;

  @ManyToOne(() => SportType, { eager: true, nullable: true })
  sportType: SportType;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
