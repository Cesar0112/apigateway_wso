import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  getScopesBySession(sessionId: number): string[] {
    let scopes: string[] = [];

    return scopes;
  }
}
