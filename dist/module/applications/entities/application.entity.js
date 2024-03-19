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
exports.Application = void 0;
const openapi = require("@nestjs/swagger");
const member_entity_1 = require("../../members/entities/member.entity");
const vin_slot_entity_1 = require("../../vin-slots/entities/vin-slot.entity");
const typeorm_1 = require("typeorm");
let Application = class Application {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, status: { required: true, type: () => String }, createdBy: { required: true, type: () => require("../../members/entities/member.entity").Member }, vinSlot: { required: true, type: () => require("../../vin-slots/entities/vin-slot.entity").VinSlot }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'createdBy',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", member_entity_1.Member)
], Application.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vin_slot_entity_1.VinSlot, { eager: true }),
    __metadata("design:type", vin_slot_entity_1.VinSlot)
], Application.prototype, "vinSlot", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)()
], Application);
//# sourceMappingURL=application.entity.js.map