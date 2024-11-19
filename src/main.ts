import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as setEnvVariables } from 'dotenv';

import { AppModule } from './app.module';

setEnvVariables();

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagger = new DocumentBuilder()
    .setTitle('Home music library')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}

bootstrap();
