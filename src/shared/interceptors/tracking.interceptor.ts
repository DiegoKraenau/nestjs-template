import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class Tracking implements NestInterceptor {
  private readonly logger = new Logger(Tracking.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const clientIp =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    this.logger.log(
      `[${request.method}] ${request.url} | IP: ${clientIp} | Params: ${JSON.stringify(
        request.params,
      )} | Request: ${JSON.stringify(request.body)}`,
    );

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `[Response] ${request.method} ${request.url} | Status: ${response.statusCode} | Response: ${JSON.stringify(
            data,
          )}`,
        );
      }),
    );
  }
}
