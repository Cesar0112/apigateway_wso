// config.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WSO2Config {
  @IsString()
  @IsOptional()
  HOST: string = '10.12.24.205';

  @IsNumber()
  @IsOptional()
  PORT: number = 9443;

  @IsString()
  @IsOptional()
  API_VERSION: string = 'v2';

  @IsString()
  @IsOptional()
  URL: string = `https://${this.HOST}:${this.PORT}`;

  @IsString()
  @IsOptional()
  URL_TOKEN: string = `${this.URL}/oauth2/token`;

  @IsString()
  @IsOptional()
  REVOKE_URL: string = `${this.URL}/oauth2/revoke`;

  @IsString()
  @IsOptional()
  CLIENT_ID: string = 'cIGhYzy75LwxzSVFb9k4BsSavT0a';

  @IsString()
  @IsOptional()
  CLIENT_SECRET: string = 'T9PjTVNCvvONGAof4Rec_70BZVvuYAts8PmDt5aikPga';
}

export class ApiGatewayConfig {
  @IsString()
  @IsOptional()
  HOST: string = 'localhost';

  @IsNumber()
  @IsOptional()
  PORT: number = 10411;

  @IsString()
  @IsOptional()
  SESSION_SECRET: string = 's3cr3t';

  @IsBoolean()
  @IsOptional()
  PROXY: boolean = false;

  @IsString()
  @IsOptional()
  API_URL: string = `http://${this.HOST}:10410`;

  @IsString()
  @IsOptional()
  ENCRYPTION_PASSWORD: string = 'IkIopwlWorpqUj';

  @IsString()
  @IsOptional()
  REDIS_URL: string = 'redis://localhost:6379';

  @IsString()
  @IsOptional()
  PROXY_STATIC_MAP_PATH: string = './routes.json';

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:8080';

  @IsString()
  @IsOptional()
  HTTP_METHODS_ALLOWED: string = 'GET,HEAD,PUT,PATCH,POST,DELETE';
}

export class SessionConfig {
  @IsString()
  @IsOptional()
  FOLDER: string = 'sessions_dev';

  @IsString()
  @IsOptional()
  SECRET: string = 'T9PjTVNCvvONGAof4RecIkIopwlWorpqUj';

  @IsNumber()
  @IsOptional()
  TTL_SECONDS: number = 86400;

  @IsString()
  @IsOptional()
  COOKIE_NAME: string = 'apigateway_sid';

  @IsString()
  @IsOptional()
  REDIS_HOST: string = 'localhost';

  @IsNumber()
  @IsOptional()
  REDIS_PORT: number = 6379;

  @IsBoolean()
  @IsOptional()
  REDIS_TLS: boolean = false;
}

export class Config {
  @IsString()
  NODE_ENV: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WSO2Config)
  WSO2?: WSO2Config;

  @IsOptional()
  @ValidateNested()
  @Type(() => ApiGatewayConfig)
  API_GATEWAY?: ApiGatewayConfig;

  @IsOptional()
  @ValidateNested()
  @Type(() => SessionConfig)
  SESSION?: SessionConfig;
}

export class RoutesConfig {
  @IsArray()
  ROUTE: string[];
}
