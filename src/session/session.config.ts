import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionConfig {
  readonly secret: string;
  readonly ttlSeconds: number; //Está en segundos
  readonly cookieName: string;
  readonly redis: {
    host: string;
    port: number;
    password?: string;
    tls: boolean;
  };
  constructor(private readonly cfg: ConfigService) {
    this.secret = this.cfg.getOrThrow<string>('SESSION_SECRET');
    this.ttlSeconds = +this.cfg.getOrThrow<number>(
      'SESSION_TTL_SECONDS',
      86400,
    ); //Está en segundos
    this.cookieName = this.cfg.get<string>('SESSION_COOKIE_NAME', 'sid');
    this.redis = {
      host: this.cfg.get<string>('REDIS_HOST', 'localhost'),
      port: +this.cfg.get<number>('REDIS_PORT', 6379),
      password: this.cfg.get<string>('REDIS_PASSWORD'),
      tls: this.cfg.get<boolean>('REDIS_TLS', false),
    };
  }
}
