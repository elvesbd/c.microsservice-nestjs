import { MailerService } from '@nestjs-modules/mailer';
import { KafkaMessage } from 'kafkajs';
export declare class AppController {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    orderCompleted(message: KafkaMessage): Promise<void>;
}
