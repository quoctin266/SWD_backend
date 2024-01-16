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
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Application)
  application: Application;

  @ManyToOne(() => Wallet)
  @JoinColumn({
    name: 'sender',
    referencedColumnName: 'id',
  })
  sender: Wallet;

  @ManyToOne(() => Wallet)
  @JoinColumn({
    name: 'receiver',
    referencedColumnName: 'id',
  })
  receiver: Wallet;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
