import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Add a custom header to the response
    response.setHeader('X-Custom-Header', 'CustomHeaderValue');

    // Log the request method and URL
    console.log(`Request Method: ${request.method}`);
    console.log(`Request URL: ${request.url}`);

    return next.handle();
  }
}
