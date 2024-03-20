import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { TransformInterceptor } from './core/transform.interceptor';
import { JwtAuthGuard } from './module/auth/guard/jwt-auth.guard';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  const dataSource = app.get(DataSource);

  app.use(cookieParser());

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  // set global for jwt guard
  app.useGlobalGuards(new JwtAuthGuard(reflector, dataSource));

  // set global for interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // validation config for class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // config css, js, image location
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // config api version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('Sportscape Connect API')
    .setDescription('API For Sportscape Connect')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
