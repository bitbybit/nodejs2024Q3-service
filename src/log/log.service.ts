import { mkdir, appendFile, stat, rename } from 'node:fs/promises';
import * as path from 'node:path';
import {
  Inject,
  Injectable,
  type LoggerService,
  type LogLevel,
} from '@nestjs/common';

import { type AppConfig } from '../app.module';

@Injectable()
export class LogService implements LoggerService {
  private readonly logLevels: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];

  private activeLogLevels: LogLevel[] = [];

  private readonly logFilePath: string;
  private readonly logErrorFilePath: string;

  constructor(
    @Inject('APP_CONFIG')
    private readonly appConfig: AppConfig,
  ) {
    this.logFilePath = path.join(
      this.appConfig.logDir,
      this.appConfig.logFilename,
    );

    this.logErrorFilePath = path.join(
      this.appConfig.logDir,
      this.appConfig.logErrorFilename,
    );

    this.createDirectory().then(() => {
      const levelIndex = this.logLevels.indexOf(this.appConfig.logLevel);

      if (levelIndex !== -1) {
        this.activeLogLevels = this.logLevels.slice(0, levelIndex + 1);
      } else {
        this.activeLogLevels = this.logLevels;
      }
    });
  }

  async error(message: any, trace?: string, context?: string): Promise<void> {
    return this.writeLog('error', message, context, trace);
  }

  async warn(message: any, context?: string): Promise<void> {
    return this.writeLog('warn', message, context);
  }

  async log(message: any, context?: string): Promise<void> {
    return this.writeLog('log', message, context);
  }

  async debug(message: any, context?: string): Promise<void> {
    return this.writeLog('debug', message, context);
  }

  async verbose(message: any, context?: string): Promise<void> {
    return this.writeLog('verbose', message, context);
  }

  private async writeLog(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ): Promise<void> {
    if (!this.activeLogLevels.includes(level)) {
      return;
    }

    const timestamp = new Date().toISOString();

    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${
      context ? `[${context}] ` : ''
    }${message}${trace ? `\n${trace}` : ''}`;

    console.log(formattedMessage);

    await appendFile(this.logFilePath, `${formattedMessage}\n`);
    await this.rotateLogFile(this.logFilePath);

    if (level === 'error') {
      await appendFile(this.logErrorFilePath, `${formattedMessage}\n`);
      await this.rotateLogFile(this.logErrorFilePath);
    }
  }

  private async rotateLogFile(filePath: string): Promise<void> {
    try {
      const stats = await stat(filePath);

      if (stats.size / 1024 >= this.appConfig.logFileSizeKb) {
        const rotatedFilePath = `${filePath}.${Date.now()}`;

        await rename(filePath, rotatedFilePath);
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.error('Can not rotate log file', e);
      }
    }
  }

  private async createDirectory(): Promise<void> {
    try {
      await mkdir(this.appConfig.logDir, { recursive: true });
    } catch (e) {
      console.error('Can not create log directory', e);
    }
  }
}
