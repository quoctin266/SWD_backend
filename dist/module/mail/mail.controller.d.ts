import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailController {
    private readonly mailService;
    private mailerService;
    constructor(mailService: MailService, mailerService: MailerService);
    sendMail(): Promise<any>;
}
