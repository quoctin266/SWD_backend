import { Application } from 'src/module/applications/entities/application.entity';
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
  OneToMany,
} from 'typeorm';

@Entity()
export class VinSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  // ONGOING, COMPLETED, CANCELED
  @Column({ default: 'ONGOING' })
  status: string;

  @Column()
  beginAt: Date;

  @Column()
  endAt: Date;

  @ManyToOne(() => Court, { eager: true })
  court: Court;

  @ManyToOne(() => Member, { eager: true })
  @JoinColumn({
    name: 'createdBy',
    referencedColumnName: 'id',
  })
  createdBy: Member;

  @OneToMany(() => Application, (application) => application.vinSlot)
  applications: Application[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
