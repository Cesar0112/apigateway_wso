import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config';
import * as session from 'express-session';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
async function main() {
  const app = await NestFactory.create(AppModule);

  const myEnv = dotenv.config();
  dotenvExpand.expand(myEnv);

  console.log('Starting API Gateway...');
  app.enableCors({
    origin: 'http://localhost:8080', //TODO Cambiar por las URLs permitidas en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allow specific headers
    credentials: true, // Allow credentials
  });
  app.use(
    session({
      secret: environment.SESSION_SECRET ?? 's3cr3t',
      resave: false, // Do not resave session if unmodified
      saveUninitialized: false, // Do not create session until something stored
      cookie: {
        maxAge: /*24 * 60 * 60 */ 60 * 1000, // Set cookie expiration to 1 minute
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      },
    }),
  );
  app.use(morgan('dev')); // Use morgan for logging HTTP requests

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for Microservices')
    .setVersion('1.0')
    .addTag('api-gateway')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-gateway/docs', app, document);
  console.log('Swagger documentation available at /api-gateway/docs');
  console.log('CORS enabled for all origins and methods');
  console.log('API Gateway is running...');
  const port = environment.PORT ?? 3000;
  app.setGlobalPrefix('apigateway'); // Set global prefix for all routes
  await app.listen(port);
  console.log('Listening on port:', port);
}
main();
