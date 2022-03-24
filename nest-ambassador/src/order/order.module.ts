import {Module} from '@nestjs/common';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderItem} from "./order-item";
import {Order} from "./order";
import {OrderItemService} from "./order-item.service";
import {SharedModule} from "../shared/shared.module";
import {LinkModule} from "../link/link.module";
import {ProductModule} from "../product/product.module";
import {StripeModule} from "nestjs-stripe";
import {ConfigService} from "@nestjs/config";
import {OrderListener} from "./listeners/order.listener";
import {MailerModule} from "@nestjs-modules/mailer";
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem]),
        SharedModule,
        LinkModule,
        ProductModule,
        StripeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                apiKey: configService.get('STRIPE_KEY'),
                apiVersion: '2020-08-27',
            })
        }),
        ClientsModule.register([
            {
              name: 'KAFKA_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                    brokers: ['pkc-419q3.us-east4.gcp.confluent.cloud:9092'],
                    ssl: true,
                    sasl: {
                      mechanism: 'plain',
                      username: 'IMME2FGSVO65QTRT',
                      password: 'xvTRpnXDP6cvsgVC0bQDltQ+3oCD7H+RHh7b9KvQNC8O7i4clg7Vr5ltOumtgEoQ',
                    },
                  },
               /*  consumer: {
                  groupId: 'hero-consumer'
                } */
              }
            },
          ]),
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderItemService, OrderListener]
})

export class OrderModule {
}
