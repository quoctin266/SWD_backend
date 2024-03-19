"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const transform_interceptor_1 = require("./core/transform.interceptor");
const jwt_auth_guard_1 = require("./module/auth/guard/jwt-auth.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const reflector = app.get(core_1.Reflector);
    app.use((0, cookie_parser_1.default)());
    app.enableCors({ origin: 'http://localhost:3000', credentials: true });
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sportscape Connect API')
        .setDescription('API For Sportscape Connect')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map