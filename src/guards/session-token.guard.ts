import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SessionTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.session?.accessToken;
    if (!token) {
      throw new UnauthorizedException('No session token found');
    }
    try {
      // Decodifica el token sin verificar la firma (solo para leer el payload)
      const decoded: any = jwt.decode(token);
      if (!decoded || !decoded.exp) {
        throw new UnauthorizedException('Invalid token');
      }
      // Verifica expiración (exp está en segundos desde epoch)
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        req.session.destroy?.(() => {}); // Destruye la sesión si el token expiró
        throw new UnauthorizedException('Session expired');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
