import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';
import { AppModule } from '../../app.module';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  const connection = await createConnection({
    name: 'old',
    type: 'mysql',
    host: '172.17.0.1',
    port: 33066,
    username: 'root',
    password: 'root',
    database: 'ambassador',
    entities: [User],
  });

  const users = await connection.manager.find(User);

  for (let i = 0; users.length; i++) {
    await userService.save(users[i]);
  }

  process.exit();
})();
