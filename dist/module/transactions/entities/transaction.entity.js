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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const openapi = require("@nestjs/swagger");
const application_entity_1 = require("../../applications/entities/application.entity");
const wallet_entity_1 = require("../../wallets/entities/wallet.entity");
const typeorm_1 = require("typeorm");
let Transaction = class Transaction {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, amount: { required: true, type: () => Number }, description: { required: true, type: () => String }, application: { required: true, type: () => require("../../applications/entities/application.entity").Application }, sender: { required: true, type: () => require("../../wallets/entities/wallet.entity").Wallet }, receiver: { required: true, type: () => require("../../wallets/entities/wallet.entity").Wallet }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => application_entity_1.Application, { nullable: true, eager: true }),
    __metadata("design:type", application_entity_1.Application)
], Transaction.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.Wallet, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'sender',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", wallet_entity_1.Wallet)
], Transaction.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.Wallet, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'receiver',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", wallet_entity_1.Wallet)
], Transaction.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Transaction.prototype, "deletedAt", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
//# sourceMappingURL=transaction.entity.js.map