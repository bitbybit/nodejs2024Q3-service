import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PORT } from './envs';
import { AppDataSource } from './data-source';
import { type AppConfig, AppModule } from './app.module';

async function bootstrap() {
  const appConfig: AppConfig = {
    dataSourceOptions: AppDataSource.options,
  };

  const app = await NestFactory.create(AppModule.forRoot(appConfig));

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
