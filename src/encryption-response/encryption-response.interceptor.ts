import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/config/config.service';
import { EncryptionsService } from 'src/encryptions/encryptions.service';

@Injectable()
export class EncryptionResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly encryption: EncryptionsService,
    private readonly cfg: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<string | object> {
    const response: Response = context.switchToHttp().getResponse<Response>();

    // Activar cifrado solo si la contraseña está configurada
    const encryptionEnabled = Boolean(
      this.cfg.get('API_GATEWAY')?.ENCRYPTION_PASSWORD.trim(),
    );

    if (encryptionEnabled) {
      response.setHeader('X-Encrypted', 'true');
    }

    return next.handle().pipe(
      map((body: object) => {
        if (!encryptionEnabled) {
          return body; // devuelve el body sin tocar
        }

        const plain = body == null ? '' : JSON.stringify(body);
        return this.encryption.encrypt(plain);
      }),
    );
  }
}
