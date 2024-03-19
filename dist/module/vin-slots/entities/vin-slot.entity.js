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
exports.VinSlot = void 0;
const openapi = require("@nestjs/swagger");
const application_entity_1 = require("../../applications/entities/application.entity");
const court_entity_1 = require("../../courts/entities/court.entity");
const member_entity_1 = require("../../members/entities/member.entity");
const typeorm_1 = require("typeorm");
let VinSlot = class VinSlot {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, capacity: { required: true, type: () => Number }, status: { required: true, type: () => String }, beginAt: { required: true, type: () => Date }, endAt: { required: true, type: () => Date }, court: { required: true, type: () => require("../../courts/entities/court.entity").Court }, createdBy: { required: true, type: () => require("../../members/entities/member.entity").Member }, applications: { required: true, type: () => [require("../../applications/entities/application.entity").Application] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.VinSlot = VinSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VinSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VinSlot.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'ONGOING' }),
    __metadata("design:type", String)
], VinSlot.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], VinSlot.prototype, "beginAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], VinSlot.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => court_entity_1.Court, { eager: true }),
    __metadata("design:type", court_entity_1.Court)
], VinSlot.prototype, "court", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'createdBy',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", member_entity_1.Member)
], VinSlot.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, (application) => application.vinSlot),
    __metadata("design:type", Array)
], VinSlot.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VinSlot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], VinSlot.prototype, "updatedAt", void 0);
exports.VinSlot = VinSlot = __decorate([
    (0, typeorm_1.Entity)()
], VinSlot);
//# sourceMappingURL=vin-slot.entity.js.map