import { Application } from 'src/module/applications/entities/application.entity';
import { Wallet } from 'src/module/wallets/entities/wallet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Application, { nullable: true, eager: true })
  application: Application;

  @ManyToOne(() => Wallet, { eager: true })
  @JoinColumn({
    name: 'sender',
    referencedColumnName: 'id',
  })
  sender: Wallet;

  @ManyToOne(() => Wallet, { eager: true })
  @JoinColumn({
    name: 'receiver',
    referencedColumnName: 'id',
  })
  receiver: Wallet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
