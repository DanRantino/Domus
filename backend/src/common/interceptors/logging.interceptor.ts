import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const start = performance.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = (performance.now() - start).toFixed(2);

          this.logger.log(
            `${request.method} ${request.originalUrl} ${response.statusCode} - ${duration}ms`,
          );
        },
        error: (error) => {
          const duration = (performance.now() - start).toFixed(2);

          this.logger.error(
            `${request.method} ${request.originalUrl} ${response.statusCode} - ${duration}ms`,
            error.stack,
          );
        },
      }),
    );
  }
}
