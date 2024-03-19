import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionFilterDto } from './dto/filter-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("typeorm").ObjectLiteral>;
    findList(query: TransactionFilterDto): Promise<{
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
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
