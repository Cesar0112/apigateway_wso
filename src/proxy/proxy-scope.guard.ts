// src/proxy/proxy-scope.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ProxyConfigService } from './proxy-config.service';
import { Request } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProxyScopeGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly proxyConfigService: ProxyConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const map: any = await this.proxyConfigService.getMap();
    const key: string = req.method.toUpperCase() + req.path;

    const required = map[key] ?? [];

    if (!required.length) return true; // Público

    const sessionData = await this.cacheManager.get<string>(
      'sess:' + req.sessionID,
    );
    const userSession: { permissions: string[] } = sessionData
      ? (JSON.parse(sessionData) as { permissions: string[] })
      : { permissions: [] };

    const userScopes = userSession.permissions;
    return required.every((r) => userScopes.includes(r));
  }
}
