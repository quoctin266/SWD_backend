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
exports.VinSlotsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const vin_slots_service_1 = require("./vin-slots.service");
const create_vin_slot_dto_1 = require("./dto/create-vin-slot.dto");
const update_vin_slot_dto_1 = require("./dto/update-vin-slot.dto");
const swagger_1 = require("@nestjs/swagger");
const customize_1 = require("../../decorator/customize");
const message_1 = require("../../util/message");
const filter_vin_slot_dto_1 = require("./dto/filter-vin-slot.dto");
const filter_slot_summary_dto_1 = require("./dto/filter-slot-summary.dto");
let VinSlotsController = class VinSlotsController {
    constructor(vinSlotsService) {
        this.vinSlotsService = vinSlotsService;
    }
    create(createVinSlotDto) {
        return this.vinSlotsService.create(createVinSlotDto);
    }
    getSummary(query) {
        return this.vinSlotsService.getSummary(query);
    }
    findList(query) {
        return this.vinSlotsService.findList(query);
    }
    findOne(id) {
        return this.vinSlotsService.findOne(+id);
    }
    update(id, updateVinSlotDto) {
        return this.vinSlotsService.update(+id, updateVinSlotDto);
    }
};
exports.VinSlotsController = VinSlotsController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)(message_1.CREATE_SLOT),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vin_slot_dto_1.CreateVinSlotDto]),
    __metadata("design:returntype", void 0)
], VinSlotsController.prototype, "create", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)('/summary'),
    (0, customize_1.ResponseMessage)(message_1.GET_SLOT_SUMMARY),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_slot_summary_dto_1.SummaryFilterDto]),
    __metadata("design:returntype", void 0)
], VinSlotsController.prototype, "getSummary", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)(message_1.GET_SLOTS),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_vin_slot_dto_1.VinSlotFilterDto]),
    __metadata("design:returntype", void 0)
], VinSlotsController.prototype, "findList", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)(message_1.GET_SLOT_DETAIL),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VinSlotsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, customize_1.ResponseMessage)(message_1.UPDATE_SLOT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vin_slot_dto_1.UpdateVinSlotDto]),
    __metadata("design:returntype", void 0)
], VinSlotsController.prototype, "update", null);
exports.VinSlotsController = VinSlotsController = __decorate([
    (0, swagger_1.ApiTags)('vin slots'),
    (0, common_1.Controller)('vin-slots'),
    __metadata("design:paramtypes", [vin_slots_service_1.VinSlotsService])
], VinSlotsController);
//# sourceMappingURL=vin-slots.controller.js.map