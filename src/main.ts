import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ConfigService } from './config/config.service';
import * as express from 'express';
async function main() {
  const app = await NestFactory.create(AppModule);
  const cfg = app.get(ConfigService);
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // Use morgan for logging HTTP requests
  }

  //3. Servir configuración
  app.use(express.static('public'));

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
    origin: cfg.get('API_GATEWAY')?.CORS_ORIGIN, // Allow specific origins
    exposedHeaders: ['Set-Cookie'],
    methods: cfg.get('API_GATEWAY')?.HTTP_METHODS_ALLOWED, // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin'], // Allow specific headers
    credentials: true, // Allow credentials
  });
  const port = cfg.get('API_GATEWAY')?.PORT ?? 3000;
  await app.listen(port);
  console.log(
    `🚀 API Gateway listening on http://localhost:${port}/apigateway`,
  );
}
main();
