import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
async function main() {
  // 1. Cargar variables de entorno
  dotenvExpand.expand(dotenv.config());
  const app = await NestFactory.create(AppModule);
  const cfg = app.get(ConfigService);

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // Use morgan for logging HTTP requests
  }

  //4 .Prefijo golbal
  app.setGlobalPrefix('apigateway'); // Set global prefix for all routes

  // 5. Documentación Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for Microservices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('apigateway/docs', app, document);
  app.enableCors({
    origin: cfg.get<string>('CORS_ORIGIN', 'http://localhost:8080').split(','), // Allow specific origins
    exposedHeaders: ['Set-Cookie'],
    methods: cfg.get<string>(
      'HTTP_METHODS_ALLOWED',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    ), // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin'], // Allow specific headers
    credentials: true, // Allow credentials
  });
  const port = cfg.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(
    `🚀 API Gateway listening on http://localhost:${port}/apigateway`,
  );
}
main();
