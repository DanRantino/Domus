import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      let responseBody: object;

      if (typeof exceptionResponse === 'string') {
        responseBody = {
          message: exceptionResponse,
        };
      } else {
        responseBody = exceptionResponse;
      }

      response.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.originalUrl,
        method: request.method,
        ...responseBody,
      });
    }
  }
}
