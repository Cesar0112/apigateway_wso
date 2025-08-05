// src/proxy/proxy-scope.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ProxyConfigService } from './proxy-config.service';
import { Request } from 'express';

@Injectable()
export class ProxyScopeGuard implements CanActivate {
  constructor(private readonly cfg: ProxyConfigService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const map: Record<string, string[]> = await this.cfg.getMap();
    const key = `${req.method.toUpperCase()}${req.originalUrl}`;
    const required = map[key] ?? [];

    if (!required.length) return true; // Público

    // Aquí tu lógica de comparación con los scopes del token/cookie
    console.log('sessionId', req.sessionID);

    const userScopes = req.sessionID ?? [];
    return required.every((r) => userScopes.includes(r));
  }
}
