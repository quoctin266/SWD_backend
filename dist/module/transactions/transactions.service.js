"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const wallet_entity_1 = require("../wallets/entities/wallet.entity");
const application_entity_1 = require("../applications/entities/application.entity");
const message_1 = require("../../util/message");
let TransactionsService = class TransactionsService {
    constructor(transactionsRepository, walletsRepository, applicationsRepository) {
        this.transactionsRepository = transactionsRepository;
        this.walletsRepository = walletsRepository;
        this.applicationsRepository = applicationsRepository;
    }
    async create(createTransactionDto) {
        const { applicationId, senderId, receiverId, amount, description } = createTransactionDto;
        const application = applicationId
            ? await this.applicationsRepository.findOneBy({
                id: applicationId,
            })
            : null;
        const sender = await this.walletsRepository.findOneBy({ id: senderId });
        if (!sender)
            throw new common_1.BadRequestException(message_1.NOTFOUND_WALLET);
        const receiver = await this.walletsRepository.findOneBy({ id: receiverId });
        if (!receiver)
            throw new common_1.BadRequestException(message_1.NOTFOUND_WALLET);
        await this.walletsRepository.update(senderId, {
            balance: sender.balance - amount,
        });
        await this.walletsRepository.update(receiverId, {
            balance: receiver.balance + amount,
        });
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
    async findList(queryObj) {
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
            .orderBy(sortableCriterias.includes(sortBy) ? `transaction.${sortBy}` : '', sortDescending ? 'DESC' : 'ASC')
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
    async findOne(id) {
        const transaction = await this.transactionsRepository.findOneBy({ id });
        if (!transaction)
            throw new common_1.BadRequestException(message_1.NOTFOUND_TRANSACTION);
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
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    async remove(id) {
        const existTransaction = await this.transactionsRepository.existsBy({ id });
        if (!existTransaction)
            throw new common_1.BadRequestException(message_1.NOTFOUND_TRANSACTION);
        return this.transactionsRepository.softDelete(id);
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __param(2, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map