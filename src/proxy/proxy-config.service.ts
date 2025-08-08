// src/proxy/proxy-config.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';

import * as fs from 'fs';
import { RoutesConfig } from 'src/config/config';
import { ConfigService } from 'src/config/config.service';
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

    const map: RoutesConfig = this.cfg.getRoutes();

    await this.redisService.set(this.key, JSON.stringify(map));
  }

  async getMap(): Promise<{ [key: string]: string[] }> {
    const raw = await this.redisService.get(this.key);
    return raw ? (JSON.parse(raw) as { [key: string]: string[] }) : {};
  }

  async setMap(map: Record<string, string[]>) {
    await this.redisService.set(this.key, JSON.stringify(map));
  }
}
