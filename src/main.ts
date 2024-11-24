import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  CRYPT_SALT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  LOG_DIR,
  LOG_FILENAME,
  LOG_ERROR_FILENAME,
  LOG_FILE_SIZE_KB,
  LOG_LEVEL,
  PORT,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from './envs';
import { AppDataSource } from './data-source';

import { type AppConfig, AppModule } from './app.module';

import { LogService } from './log/log.service';
import { LogExceptionFilter } from './log/log.catch';

async function bootstrap() {
  const appConfig: AppConfig = {
    cryptSalt: CRYPT_SALT,
    dataSourceOptions: AppDataSource.options,
    jwtSecretKey: JWT_SECRET_KEY,
    jwtSecretRefreshKey: JWT_SECRET_REFRESH_KEY,
    logDir: LOG_DIR,
    logFileSizeKb: LOG_FILE_SIZE_KB,
    logFilename: LOG_FILENAME,
    logErrorFilename: LOG_ERROR_FILENAME,
    logLevel: LOG_LEVEL,
    tokenExpireTime: TOKEN_EXPIRE_TIME,
    tokenRefreshExpireTime: TOKEN_REFRESH_EXPIRE_TIME,
  };

  const app = await NestFactory.create(AppModule.forRoot(appConfig));

  const logger = app.get(LogService);

  app.useGlobalFilters(new LogExceptionFilter(logger));

  process.on('uncaughtException', (e) => {
    logger.error(`Uncaught Exception: ${e.message}`, e.stack);
  });

  process.on('unhandledRejection', (e) => {
    logger.error(`Unhandled Rejection: ${e}`);
  });

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
