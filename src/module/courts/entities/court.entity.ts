import { Area } from 'src/module/areas/entities/area.entity';
import { File } from 'src/module/files/entities/file.entity';
import { SportType } from 'src/module/sport-types/entities/sport-type.entity';
import { VinSlot } from 'src/module/vin-slots/entities/vin-slot.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
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

  @ManyToOne(() => File, { eager: true, nullable: true })
  file: File;

  @OneToMany(() => VinSlot, (vinSlot) => vinSlot.court)
  vinSlots: VinSlot[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
