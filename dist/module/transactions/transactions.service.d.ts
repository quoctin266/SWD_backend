import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { Application } from '../applications/entities/application.entity';
import { TransactionFilterDto } from './dto/filter-transaction.dto';
export declare class TransactionsService {
    private transactionsRepository;
    private walletsRepository;
    private applicationsRepository;
    constructor(transactionsRepository: Repository<Transaction>, walletsRepository: Repository<Wallet>, applicationsRepository: Repository<Application>);
    create(createTransactionDto: CreateTransactionDto): Promise<import("typeorm").ObjectLiteral>;
    findList(queryObj: TransactionFilterDto): Promise<{
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        items: {
            sender: string;
            receiver: string;
            application: number;
            id: number;
            amount: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        sender: string;
        receiver: string;
        application: number;
        id: number;
        amount: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    }>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
