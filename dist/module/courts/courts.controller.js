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
exports.CourtsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const courts_service_1 = require("./courts.service");
const create_court_dto_1 = require("./dto/create-court.dto");
const update_court_dto_1 = require("./dto/update-court.dto");
const swagger_1 = require("@nestjs/swagger");
const customize_1 = require("../../decorator/customize");
const message_1 = require("../../util/message");
const filter_court_dto_1 = require("./dto/filter-court.dto");
const filter_count_dto_1 = require("./dto/filter-count.dto");
let CourtsController = class CourtsController {
    constructor(courtsService) {
        this.courtsService = courtsService;
    }
    create(createCourtDto) {
        return this.courtsService.create(createCourtDto);
    }
    count(query) {
        return this.courtsService.count(query);
    }
    findList(query) {
        return this.courtsService.findList(query);
    }
    findOne(id) {
        return this.courtsService.findOne(+id);
    }
    update(id, updateCourtDto) {
        return this.courtsService.update(+id, updateCourtDto);
    }
    remove(id) {
        return this.courtsService.remove(+id);
    }
};
exports.CourtsController = CourtsController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)(message_1.CREATE_COURT),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_court_dto_1.CreateCourtDto]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, customize_1.ResponseMessage)(message_1.COUNT_COURT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_count_dto_1.CourtCountFilterDto]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)(message_1.GET_COURTS),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_court_dto_1.CourtFilterDto]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "findList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)(message_1.GET_COURT_DETAIL),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, customize_1.ResponseMessage)(message_1.UPDATE_COURT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_court_dto_1.UpdateCourtDto]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)(message_1.DELETE_COURT),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourtsController.prototype, "remove", null);
exports.CourtsController = CourtsController = __decorate([
    (0, swagger_1.ApiTags)('courts'),
    (0, common_1.Controller)('courts'),
    __metadata("design:paramtypes", [courts_service_1.CourtsService])
], CourtsController);
//# sourceMappingURL=courts.controller.js.map