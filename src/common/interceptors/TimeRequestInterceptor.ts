import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimeRequestInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return next.handle().pipe(
      tap(() => {
        console.log('Request time:', Date.now() - startTime);
      }),
    );
  }
}
