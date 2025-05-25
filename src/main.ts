import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/ParseIntId.pipe';
import { AddHeaderInterceptor } from './common/interceptors/AddHeaderInterceptor';
import { TimeRequestInterceptor } from './common/interceptors/TimeRequestInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    new ParseIntIdPipe(),
  );

  app.useGlobalInterceptors(
    new AddHeaderInterceptor(),
    new TimeRequestInterceptor(),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
