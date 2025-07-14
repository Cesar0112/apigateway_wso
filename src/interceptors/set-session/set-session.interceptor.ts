import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class SetSessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        if (data?.token && data?.user) {
          req.session.accessToken = data.token;
          req.session.user = data.user;
          req.session.permissions = data.user.permissions;
        }

        const { token, ...publicData } = data;
        // Return only the public data to the client
        return {
          ...publicData,
        };
      }),
    );
  }
}
