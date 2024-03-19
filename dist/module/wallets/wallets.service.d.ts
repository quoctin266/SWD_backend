import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletFilterDto } from './dto/filter-wallet.dto';
import { Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { Club } from '../clubs/entities/club.entity';
import { Wallet } from './entities/wallet.entity';
export declare class WalletsService {
    private walletsRepository;
    private clubsRepository;
    private membersRepository;
    constructor(walletsRepository: Repository<Wallet>, clubsRepository: Repository<Club>, membersRepository: Repository<Member>);
    create(createWalletDto: CreateWalletDto): string;
    findList(): string;
    findOne(queryObj: WalletFilterDto): Promise<{
        club: number;
        member: number;
        id: number;
        balance: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateWalletDto: UpdateWalletDto): string;
    remove(id: number): string;
}
