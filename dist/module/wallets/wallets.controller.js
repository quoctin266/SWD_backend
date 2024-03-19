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
exports.WalletsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const wallets_service_1 = require("./wallets.service");
const swagger_1 = require("@nestjs/swagger");
const filter_wallet_dto_1 = require("./dto/filter-wallet.dto");
const customize_1 = require("../../decorator/customize");
const message_1 = require("../../util/message");
let WalletsController = class WalletsController {
    constructor(walletsService) {
        this.walletsService = walletsService;
    }
    findOne(query) {
        return this.walletsService.findOne(query);
    }
};
exports.WalletsController = WalletsController;
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)(message_1.GET_WALLET_DETAIL),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_wallet_dto_1.WalletFilterDto]),
    __metadata("design:returntype", void 0)
], WalletsController.prototype, "findOne", null);
exports.WalletsController = WalletsController = __decorate([
    (0, swagger_1.ApiTags)('wallets'),
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [wallets_service_1.WalletsService])
], WalletsController);
//# sourceMappingURL=wallets.controller.js.map