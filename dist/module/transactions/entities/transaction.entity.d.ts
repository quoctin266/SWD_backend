import { Application } from 'src/module/applications/entities/application.entity';
import { Wallet } from 'src/module/wallets/entities/wallet.entity';
export declare class Transaction {
    id: number;
    amount: number;
    description: string;
    application: Application;
    sender: Wallet;
    receiver: Wallet;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
