import { type Request, type Response, type NextFunction } from 'express';
import { Injectable, type NestMiddleware } from '@nestjs/common';

import { LogService } from './log.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly logger: LogService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url, query, body } = req;
    const startTime = Date.now();

    res.on('finish', async () => {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      await this.logger.log(
        `Request: [${method}] ${url} - Query: ${JSON.stringify(
          query,
        )} - Body: ${JSON.stringify(
          body,
        )} | Response: ${statusCode} | Time: ${responseTime}ms`,
        'LogMiddleware',
      );
    });

    next();
  }
}
