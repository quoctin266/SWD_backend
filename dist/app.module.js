"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./module/users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const datasource_config_1 = require("./database/datasource.config");
const roles_module_1 = require("./module/role/roles.module");
const permissions_module_1 = require("./module/permissions/permissions.module");
const areas_module_1 = require("./module/areas/areas.module");
const sport_types_module_1 = require("./module/sport-types/sport-types.module");
const courts_module_1 = require("./module/courts/courts.module");
const vin_slots_module_1 = require("./module/vin-slots/vin-slots.module");
const clubs_module_1 = require("./module/clubs/clubs.module");
const members_module_1 = require("./module/members/members.module");
const events_module_1 = require("./module/events/events.module");
const posts_module_1 = require("./module/posts/posts.module");
const comments_module_1 = require("./module/comments/comments.module");
const applications_module_1 = require("./module/applications/applications.module");
const wallets_module_1 = require("./module/wallets/wallets.module");
const transactions_module_1 = require("./module/transactions/transactions.module");
const auth_module_1 = require("./module/auth/auth.module");
const database_module_1 = require("./database/database.module");
const files_module_1 = require("./module/files/files.module");
const mail_module_1 = require("./module/mail/mail.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.production.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync(datasource_config_1.typeOrmAsyncConfig),
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            areas_module_1.AreasModule,
            sport_types_module_1.SportTypesModule,
            courts_module_1.CourtsModule,
            vin_slots_module_1.VinSlotsModule,
            clubs_module_1.ClubsModule,
            members_module_1.MembersModule,
            events_module_1.EventsModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            applications_module_1.ApplicationsModule,
            wallets_module_1.WalletsModule,
            transactions_module_1.TransactionsModule,
            auth_module_1.AuthModule,
            database_module_1.DatabasesModule,
            files_module_1.FilesModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map