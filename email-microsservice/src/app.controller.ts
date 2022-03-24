import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('default')
  async orderCompleted(@Payload() message: KafkaMessage) {
    // getting from kafka
    console.log(message);
    const order: any = message.value;

    // send email for the admin
    await this.mailerService.sendMail({
      to: 'admin@admin.com',
      subject: 'An order has been completed',
      html: `Order #${order.id} with a total of $${order.total} has been completed!`,
    });

    // send email for the ambassador
    await this.mailerService.sendMail({
      to: order.ambassador_email,
      subject: 'An order has been completed',
      html: `You earned $${order.ambassador_revenue} from the link #${order.code}`,
    });
  }
}
