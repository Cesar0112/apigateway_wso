import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { Request } from 'express';
import { SessionData } from '../session/interfaces/session.interface';
import { SessionService } from 'src/session/session.service';

/**
 * WARNING para acceder a los datos de session que almacena express-session no usar CACHE_MANAGER
 */
@Injectable()
export class SessionTokenGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const sessionID = req.sessionID;
    if (!sessionID) {
      throw new UnauthorizedException('No session token found');
    }

    // Leemos la sesión desde el mismo store que usa express-session
    const session = await this.getSession(sessionID);

    if (!session) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // Validación opcional: ¿la cookie ya expiró?
    if (this.isExpired(session)) {
      throw new UnauthorizedException('Session has expired');
    }

    return true;
  }
  private getSession(sessionID: string): Promise<Record<string, any> | null> {
    const store = this.sessionService.getExpressSessionStore();

    return new Promise((resolve, reject) =>
      store.get(sessionID, (err, data) =>
        err ? reject(err) : resolve(data as Record<string, any> | null),
      ),
    );
  }

  private isExpired(session: Record<string, any>): boolean {
    const expires = session.cookie?.expires;
    return expires && Date.now() > new Date(expires).getTime();
  }
}
