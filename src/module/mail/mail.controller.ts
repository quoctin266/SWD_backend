import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  @Get()
  @ResponseMessage('Send mail successfully')
  @Public()
  @Cron('45 * * * * *') // 0:00 am every sunday
  async sendMail() {
    const result = await this.mailService.getAvailableSlots();

    const response = await Promise.all(
      result.map(async (data) => {
        return await this.mailerService.sendMail({
          to: data.user.email,
          from: '"Support Team" <support@example.com>',
          subject: 'Slots suggest',
          template: 'slots',
          context: data,
        });
      }),
    );
    console.log(response);
    return response;
  }
}
