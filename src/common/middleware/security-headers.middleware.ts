import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Middleware de seguridad');
    next();
  }
}
