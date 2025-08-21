// src/proxy/proxy-config.service.ts
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { RoutesConfig } from '../config/config';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ProxyConfigService implements OnModuleInit {
  private readonly key = 'proxy:routes';
  private readonly filePath = 'routes.json';

  constructor(
    private readonly cfg: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    const exists = (await this.cacheManager.get(this.key)) !== undefined;
    if (exists) return; // Ya está en el SessionStore

    const map: RoutesConfig = this.cfg.getRoutes();

    await this.cacheManager.set(this.key, JSON.stringify(map));
  }

  async getMap(): Promise<{ [key: string]: string[] }> {
    const raw = await this.cacheManager.get<string>(this.key);
    return raw ? (JSON.parse(raw) as { [key: string]: string[] }) : {};
  }

  async setMap(map: Record<string, string[]>) {
    await this.cacheManager.set(this.key, JSON.stringify(map), 0);
  }
}
