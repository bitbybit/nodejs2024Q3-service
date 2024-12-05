import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LogService } from './log.service';

@Catch()
export class LogExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LogService) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse();
    const request = httpContext.getRequest();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    const logMessage = `Exception: ${JSON.stringify({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
    })}`;

    const isDebugMessage =
      isHttpException && status !== HttpStatus.INTERNAL_SERVER_ERROR;

    const method = isDebugMessage ? 'debug' : 'error';

    await this.logger[method](logMessage);

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : 'Internal server error',
    });
  }
}
