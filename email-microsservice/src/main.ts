import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.BROKER],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: process.env.API_KEY,
            password: process.env.API_SECRET,
          },
        },
      },
    },
  );
  app.listen().then(() => logger.log('email-microservice ir running'));
}

bootstrap();
