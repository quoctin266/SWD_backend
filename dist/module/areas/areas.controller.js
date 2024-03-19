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
exports.AreasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const areas_service_1 = require("./areas.service");
const create_area_dto_1 = require("./dto/create-area.dto");
const update_area_dto_1 = require("./dto/update-area.dto");
const swagger_1 = require("@nestjs/swagger");
const customize_1 = require("../../decorator/customize");
const message_1 = require("../../util/message");
const filter_area_dto_1 = require("./dto/filter-area.dto");
let AreasController = class AreasController {
    constructor(areasService) {
        this.areasService = areasService;
    }
    create(createAreaDto) {
        return this.areasService.create(createAreaDto);
    }
    findList(query) {
        return this.areasService.findList(query);
    }
    findOne(id) {
        return this.areasService.findOne(+id);
    }
    update(id, updateAreaDto) {
        return this.areasService.update(+id, updateAreaDto);
    }
    remove(id) {
        return this.areasService.remove(+id);
    }
};
exports.AreasController = AreasController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)(message_1.CREATE_AREA),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", void 0)
], AreasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)(message_1.GET_AREAS),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_area_dto_1.AreaFilterDto]),
    __metadata("design:returntype", void 0)
], AreasController.prototype, "findList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)(message_1.GET_AREA_DETAIL),
    openapi.ApiResponse({ status: 200, type: require("./entities/area.entity").Area }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AreasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, customize_1.ResponseMessage)(message_1.UPDATE_AREA),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", void 0)
], AreasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)(message_1.DELETE_AREA),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AreasController.prototype, "remove", null);
exports.AreasController = AreasController = __decorate([
    (0, swagger_1.ApiTags)('areas'),
    (0, common_1.Controller)('areas'),
    __metadata("design:paramtypes", [areas_service_1.AreasService])
], AreasController);
//# sourceMappingURL=areas.controller.js.map