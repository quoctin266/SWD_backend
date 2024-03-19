"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mail_controller_1 = require("./mail.controller");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const typeorm_1 = require("@nestjs/typeorm");
const vin_slot_entity_1 = require("../vin-slots/entities/vin-slot.entity");
const user_entity_1 = require("../users/entities/user.entity");
const member_entity_1 = require("../members/entities/member.entity");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('EMAIL_HOST'),
                        secure: false,
                        auth: {
                            user: configService.get('APP_EMAIL'),
                            pass: configService.get('APP_PASSWORD'),
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'templates'),
                        adapter: new ejs_adapter_1.EjsAdapter({ inlineCssEnabled: true }),
                        options: {
                            strict: false,
                        },
                    },
                    preview: false,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([vin_slot_entity_1.VinSlot, user_entity_1.User, member_entity_1.Member]),
        ],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map