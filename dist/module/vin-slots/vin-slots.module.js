"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VinSlotsModule = void 0;
const common_1 = require("@nestjs/common");
const vin_slots_service_1 = require("./vin-slots.service");
const vin_slots_controller_1 = require("./vin-slots.controller");
const typeorm_1 = require("@nestjs/typeorm");
const vin_slot_entity_1 = require("./entities/vin-slot.entity");
const court_entity_1 = require("../courts/entities/court.entity");
const member_entity_1 = require("../members/entities/member.entity");
let VinSlotsModule = class VinSlotsModule {
};
exports.VinSlotsModule = VinSlotsModule;
exports.VinSlotsModule = VinSlotsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vin_slot_entity_1.VinSlot, court_entity_1.Court, member_entity_1.Member])],
        controllers: [vin_slots_controller_1.VinSlotsController],
        providers: [vin_slots_service_1.VinSlotsService],
    })
], VinSlotsModule);
//# sourceMappingURL=vin-slots.module.js.map