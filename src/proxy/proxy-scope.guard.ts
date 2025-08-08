// src/proxy/proxy-scope.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ProxyConfigService } from './proxy-config.service';
import { Request } from 'express';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProxyScopeGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly proxyConfigService: ProxyConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const map: any = await this.proxyConfigService.getMap();
    const key: string = req.method.toUpperCase() + req.path;

    const required = map[key] ?? [];

    if (!required.length) return true; // Público

    const sessionData = await this.redisService.get('sess:' + req.sessionID);
    const userSession: { permissions: string[] } = sessionData
      ? (JSON.parse(sessionData) as { permissions: string[] })
      : { permissions: [] };

    const userScopes = userSession.permissions;
    console.log('userScopes', userScopes);
    return required.every((r) => userScopes.includes(r));
  }
}
