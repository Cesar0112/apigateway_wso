import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { ValidationPipe } from '@nestjs/common';
//import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'; // créalo si no existe
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import * as cookieParser from 'cookie-parser';
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
  // 2. Middleware en orden logico
  app.use(cookieParser()); // Use cookie parser middleware
  console.log('NODE ENV', cfg.get<string>('NODE_ENV'));

  //Redis
  // Initialize client.
  const redisClient = createClient({
    url: cfg.get<string>('REDIS_URL', 'redis://localhost:6379'),
  }) as any;
  redisClient.connect().catch(console.error);

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient as any,
    prefix: 'myapp:',
  });

  app.use(
    session({
      secret: cfg.get<string>('SESSION_SECRET', 's3cr3t'),
      resave: false, // Do not resave session if unmodified
      saveUninitialized: false, // Do not create session until something stored

      cookie: {
        maxAge: cfg.get<number>('SESSION_MAX_AGE', 24 * 60 * 60 * 1000), // Default to 24 hours
        secure: cfg.get<string>('NODE_ENV') === 'production', // Set to true if using HTTPS
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        partitioned: true,
        sameSite: 'lax',
      },
      store: redisStore as any, // Use Redis store for session management
    }),
  );
  // 3. Pipes & Filters globales
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  //app.useGlobalFilters(new AllExceptionsFilter());

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
    methods: cfg.get<string>(
      'HTTP_METHODS_ALLOWED',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    ), // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allow specific headers
    credentials: true, // Allow credentials
  });
  const port = cfg.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(
    `🚀 API Gateway listening on http://localhost:${port}/apigateway`,
  );
}
main();
