import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  CRYPT_SALT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  PORT,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from './envs';
import { AppDataSource } from './data-source';

import { type AppConfig, AppModule } from './app.module';

async function bootstrap() {
  const appConfig: AppConfig = {
    cryptSalt: CRYPT_SALT,
    dataSourceOptions: AppDataSource.options,
    jwtSecretKey: JWT_SECRET_KEY,
    jwtSecretRefreshKey: JWT_SECRET_REFRESH_KEY,
    tokenExpireTime: TOKEN_EXPIRE_TIME,
    tokenRefreshExpireTime: TOKEN_REFRESH_EXPIRE_TIME,
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
