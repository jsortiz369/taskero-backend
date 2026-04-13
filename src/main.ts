import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
import cookie from '@fastify/cookie';
process.env.TZ = 'UTC';

import { AppModule } from './app/app.module';
import { IEnvRepository } from './shared/env/domain/env.repository';
import { HttpExceptionFilter } from './app/http/filters';
import { RequestMultipartInterceptor, RequestAgentInterceptor, ResponseTimeInterceptor } from './app/http/interceptors';
import { ILoggerRepository } from './shared/logger/domain/logger.repository';

declare module 'fastify' {
  interface FastifyRequest {
    idUser?: string;
    userAgentData?: {
      browser: string;
      version?: string;
      device: string;
      os: string;
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  // get port from env
  const _env = app.get<IEnvRepository>(IEnvRepository);

  await app.register(cookie, { secret: _env.get('SECRET_COOKIE'), parseOptions: { httpOnly: true, secure: true, sameSite: 'lax' } });

  const logger = app.get<ILoggerRepository>(ILoggerRepository);

  // global filters
  app.useGlobalFilters(app.get<HttpExceptionFilter>(HttpExceptionFilter));

  // global interceptors
  app.useGlobalInterceptors(app.get<RequestMultipartInterceptor>(RequestMultipartInterceptor));
  app.useGlobalInterceptors(app.get<ResponseTimeInterceptor>(ResponseTimeInterceptor));
  app.useGlobalInterceptors(app.get<RequestAgentInterceptor>(RequestAgentInterceptor));

  // global prefix
  app.setGlobalPrefix('api/v1');

  // register multipar
  await app.register(fastifyMultipart, {
    attachFieldsToBody: false,
    limits: {
      fileSize: 1024 * 1024 * 1024, // 1 GB
    },
  });

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
