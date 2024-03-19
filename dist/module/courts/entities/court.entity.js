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
exports.Court = void 0;
const openapi = require("@nestjs/swagger");
const area_entity_1 = require("../../areas/entities/area.entity");
const sport_type_entity_1 = require("../../sport-types/entities/sport-type.entity");
const vin_slot_entity_1 = require("../../vin-slots/entities/vin-slot.entity");
const typeorm_1 = require("typeorm");
let Court = class Court {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, isAvailable: { required: true, type: () => Boolean }, sportType: { required: true, type: () => require("../../sport-types/entities/sport-type.entity").SportType }, area: { required: true, type: () => require("../../areas/entities/area.entity").Area }, vinSlots: { required: true, type: () => [require("../../vin-slots/entities/vin-slot.entity").VinSlot] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
exports.Court = Court;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Court.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Court.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Court.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_type_entity_1.SportType, { eager: true }),
    __metadata("design:type", sport_type_entity_1.SportType)
], Court.prototype, "sportType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_entity_1.Area, { eager: true }),
    __metadata("design:type", area_entity_1.Area)
], Court.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vin_slot_entity_1.VinSlot, (vinSlot) => vinSlot.court),
    __metadata("design:type", Array)
], Court.prototype, "vinSlots", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Court.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Court.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Court.prototype, "deletedAt", void 0);
exports.Court = Court = __decorate([
    (0, typeorm_1.Entity)()
], Court);
//# sourceMappingURL=court.entity.js.map