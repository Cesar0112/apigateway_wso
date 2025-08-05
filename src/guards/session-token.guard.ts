import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { RedisService } from 'src/redis/redis.service';
import { SessionRedis } from 'src/session/session.interface';

@Injectable()
export class SessionTokenGuard implements CanActivate {
  constructor(private redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const sessionID = req.sessionID;
    if (!sessionID) {
      throw new UnauthorizedException('No session token found');
    }

    try {
      // Verificar si el sessionID existe en Redis
      const sessionData = await this.redisService.get('sess:' + sessionID);
      if (!sessionData) {
        throw new UnauthorizedException('Invalid or expired session');
      }

      // Opcional: Verificar si la sesión ha expirado (si Redis almacena una fecha de expiración)
      const session: SessionRedis = JSON.parse(sessionData) as SessionRedis;

      if (
        session.cookie.expires &&
        Date.now() > new Date(session.cookie.expires).getTime()
      ) {
        throw new UnauthorizedException('Session has expired');
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
