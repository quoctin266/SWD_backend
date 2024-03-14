import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { Application } from '../applications/entities/application.entity';
import { NOTFOUND_TRANSACTION, NOTFOUND_WALLET } from 'src/util/message';
import { TransactionFilterDto } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { applicationId, senderId, receiverId, amount, description } =
      createTransactionDto;

    const application = applicationId
      ? await this.applicationsRepository.findOneBy({
          id: applicationId,
        })
      : null;

    const sender = await this.walletsRepository.findOneBy({ id: senderId });
    if (!sender) throw new BadRequestException(NOTFOUND_WALLET);

    const receiver = await this.walletsRepository.findOneBy({ id: receiverId });
    if (!receiver) throw new BadRequestException(NOTFOUND_WALLET);

    // transfer points from sender wallet to receiver wallet
    await this.walletsRepository.update(senderId, {
      balance: sender.balance - amount,
    });
    await this.walletsRepository.update(receiverId, {
      balance: receiver.balance + amount,
    });

    // update application status to completed
    if (applicationId)
      await this.applicationsRepository.update(applicationId, {
        status: 'COMPLETED',
      });

    const result = await this.transactionsRepository.insert({
      amount,
      description,
      sender,
      receiver,
      application,
    });

    return result.generatedMaps[0];
  }

  async findList(queryObj: TransactionFilterDto) {
    const { sortBy, sortDescending, pageSize, current } = queryObj;

    const defaultLimit = pageSize ? pageSize : 10;
    const defaultPage = current ? current : 1;
    const offset = (defaultPage - 1) * defaultLimit;

    const query = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.sender', 'wallet')
      .leftJoinAndSelect('transaction.receiver', 'walletAlias')
      .leftJoinAndSelect('transaction.application', 'application')
      .leftJoinAndSelect('wallet.member', 'member')
      .leftJoinAndSelect('wallet.club', 'club')
      .leftJoinAndSelect('walletAlias.member', 'memberAlias')
      .leftJoinAndSelect('walletAlias.club', 'clubAlias')
      .leftJoinAndSelect('member.user', 'user')
      .leftJoinAndSelect('memberAlias.user', 'userAlias');

    const totalItems = (await query.getMany()).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const sortableCriterias = ['createdAt'];

    const result = await query
      .orderBy(
        sortableCriterias.includes(sortBy) ? `transaction.${sortBy}` : '',
        sortDescending ? 'DESC' : 'ASC',
      )
      .offset(offset)
      .limit(defaultLimit)
      .getMany();

    const data = result.map((transaction) => {
      return {
        ...transaction,
        sender: transaction.sender.member
          ? transaction.sender.member.user.username
          : transaction.sender.club.name,
        receiver: transaction.receiver.member
          ? transaction.receiver.member.user.username
          : transaction.receiver.club.name,
        application: transaction.application
          ? transaction.application.id
          : null,
      };
    });

    return {
      currentPage: defaultPage,
      totalPages: totalPages,
      pageSize: defaultLimit,
      totalItems: totalItems,
      items: data,
    };
  }

  async findOne(id: number) {
    const transaction = await this.transactionsRepository.findOneBy({ id });
    if (!transaction) throw new BadRequestException(NOTFOUND_TRANSACTION);

    return {
      ...transaction,
      sender: transaction.sender.member
        ? transaction.sender.member.user.username
        : transaction.sender.club.name,
      receiver: transaction.receiver.member
        ? transaction.receiver.member.user.username
        : transaction.receiver.club.name,
      application: transaction.application ? transaction.application.id : null,
    };
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const existTransaction = await this.transactionsRepository.existsBy({ id });
    if (!existTransaction) throw new BadRequestException(NOTFOUND_TRANSACTION);

    return this.transactionsRepository.softDelete(id);
  }
}
