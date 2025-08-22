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
import { SessionService } from 'src/session/session.service';

@Injectable()
export class ProxyScopeGuard implements CanActivate {
  constructor(
    private readonly proxyConfigService: ProxyConfigService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const map: any = await this.proxyConfigService.getMap();
    const key: string = req.method.toUpperCase() + req.path;

    const required = map[key] ?? [];

    if (!required.length) return true; // Público
    const sessionData = await this.sessionService.getSession(req.sessionID);

    return required.every((r) => sessionData?.permissions.includes(r));
    return true;
  }
}
