import { Area } from 'src/module/areas/entities/area.entity';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Court {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => SportType, { eager: true })
  sportType: SportType;

  @ManyToOne(() => Area, { eager: true })
  area: Area;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
