import { NestFactory } from '@nestjs/core';
import { config as setEnvVariables } from 'dotenv';

import { AppModule } from './app.module';

setEnvVariables();

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}

bootstrap();
