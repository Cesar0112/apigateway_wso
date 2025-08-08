import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

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
    this.secret = this.cfg.get('SESSION')?.SECRET;
    this.ttlSeconds = this.cfg.get('SESSION')?.TTL_SECONDS ?? 86400; //Está en segundos
    this.cookieName = this.cfg.get('SESSION')?.COOKIE_NAME ?? 'sid';
    this.redis = {
      host: this.cfg.get('REDIS')?.HOST ?? 'localhost',
      port: this.cfg.get('REDIS')?.PORT ?? 6379,
      tls: this.cfg.get('REDIS')?.TLS ?? false,
    };
  }
}
