import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinSlot } from '../vin-slots/entities/vin-slot.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('APP_EMAIL'),
            pass: configService.get<string>('APP_PASSWORD'),
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([VinSlot, User]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
