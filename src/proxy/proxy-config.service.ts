// src/proxy/proxy-config.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProxyConfigService implements OnModuleInit {
  private readonly key = 'proxy:routes';
  private readonly filePath = 'routes.json';

  constructor(
    private readonly cfg: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    const exists = await this.redisService.exists(this.key);
    if (exists) return; // Ya está en Redis

    let map: Record<string, string[]> = {};

    // 1. Variable de entorno
    const envMap = this.cfg.get<Record<string, string[]>>('PROXY_STATIC_MAP');
    if (envMap) {
      map = envMap;
    } else if (fs.existsSync(this.filePath)) {
      // 2. Archivo routes.json
      map = JSON.parse(fs.readFileSync(this.filePath, 'utf8')) as Record<
        string,
        string[]
      >;
    }

    await this.redisService.set(this.key, JSON.stringify(map));
  }

  async getMap(): Promise<Record<string, string[]>> {
    const raw = await this.redisService.get(this.key);
    return raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
  }

  async setMap(map: Record<string, string[]>) {
    await this.redisService.set(this.key, JSON.stringify(map));
  }
}
