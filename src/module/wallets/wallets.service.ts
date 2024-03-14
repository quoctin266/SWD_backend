import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletFilterDto } from './dto/filter-wallet.dto';
import { IsNull, Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from '../clubs/entities/club.entity';
import { Wallet } from './entities/wallet.entity';
import { NOTFOUND_CLUB } from 'src/util/message';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findList() {
    return `This action returns all wallets`;
  }

  async findOne(queryObj: WalletFilterDto) {
    const { memberId, clubId } = queryObj;

    const club = await this.clubsRepository.findOneBy({ id: clubId });
    if (!club) throw new BadRequestException(NOTFOUND_CLUB);

    const wallet = await this.walletsRepository.findOne({
      relations: {
        member: true,
        club: true,
      },
      where: {
        member: {
          id: memberId ? memberId : IsNull(),
        },
        club: {
          id: clubId,
        },
      },
    });

    return {
      ...wallet,
      club: wallet.club ? wallet.club.id : null,
      member: wallet.member ? wallet.member.id : null,
    };
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
