import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
process.env.TZ = 'UTC';

import { AppModule } from './app/app.module';
import { EnvRepository } from './shared/env/domain/env.repository';
import { HttpExceptionFilter } from './app/http/filters';
import { MultipartBodyInterceptor } from './app/http/interceptors';
import { LoggerRepository } from './shared/logger/domain/logger.repository';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const logger = app.get<LoggerRepository>(LoggerRepository);

  // global filters
  app.useGlobalFilters(app.get<HttpExceptionFilter>(HttpExceptionFilter));

  // global interceptors
  app.useGlobalInterceptors(app.get<MultipartBodyInterceptor>(MultipartBodyInterceptor));

  // global prefix
  app.setGlobalPrefix('api/v1');

  // register multipar
  await app.register(fastifyMultipart, {
    attachFieldsToBody: false,
    limits: {
      fileSize: 1024 * 1024 * 1024, // 1 GB
    },
  });

  // get port from env
  const _env = app.get<EnvRepository>(EnvRepository);
  const port: number | string = _env.get('PORT');
  const origin = _env.get('CORS_ORIGIN');

  // global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // enable cors
  app.enableCors({
    origin: origin,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Timezone', 'Authorization'],
    credentials: true,
  });

  // start application
  await app.listen(port, '0.0.0.0', (): void => {
    app
      .getUrl()
      .then((url) => logger.log(`Application is running on: ${url}`))
      .catch((err) => logger.log(err));
  });
}

bootstrap().catch((err) => console.error(err));
