import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;
    const trace = exception.stack;
    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    const responseBody = {
      statusCode,
      message,
      path,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(message, trace, path);

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
