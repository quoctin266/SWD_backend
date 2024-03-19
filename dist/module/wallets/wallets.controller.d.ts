import { WalletsService } from './wallets.service';
import { WalletFilterDto } from './dto/filter-wallet.dto';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    findOne(query: WalletFilterDto): Promise<{
        club: number;
        member: number;
        id: number;
        balance: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
