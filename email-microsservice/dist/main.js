"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const logger = new common_1.Logger();
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
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
    });
    app.listen().then(() => logger.log('email-microservice ir running'));
}
bootstrap();
//# sourceMappingURL=main.js.map