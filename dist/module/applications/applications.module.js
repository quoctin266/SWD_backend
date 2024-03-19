"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const applications_controller_1 = require("./applications.controller");
const typeorm_1 = require("@nestjs/typeorm");
const application_entity_1 = require("./entities/application.entity");
const member_entity_1 = require("../members/entities/member.entity");
const club_entity_1 = require("../clubs/entities/club.entity");
const user_entity_1 = require("../users/entities/user.entity");
const vin_slot_entity_1 = require("../vin-slots/entities/vin-slot.entity");
let ApplicationsModule = class ApplicationsModule {
};
exports.ApplicationsModule = ApplicationsModule;
exports.ApplicationsModule = ApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([application_entity_1.Application, member_entity_1.Member, club_entity_1.Club, user_entity_1.User, vin_slot_entity_1.VinSlot]),
        ],
        controllers: [applications_controller_1.ApplicationsController],
        providers: [applications_service_1.ApplicationsService],
    })
], ApplicationsModule);
//# sourceMappingURL=applications.module.js.map