import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CRYPT_SALT, JWT_SECRET_KEY, TOKEN_EXPIRE_TIME, PORT } from './envs';
import { AppDataSource } from './data-source';

import { type AppConfig, AppModule } from './app.module';

async function bootstrap() {
  const appConfig: AppConfig = {
    cryptSalt: CRYPT_SALT,
    dataSourceOptions: AppDataSource.options,
    jwtSecretKey: JWT_SECRET_KEY,
    tokenExpireTime: TOKEN_EXPIRE_TIME,
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
