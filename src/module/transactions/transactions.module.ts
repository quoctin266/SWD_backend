import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { Application } from '../applications/entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Wallet, Application])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
