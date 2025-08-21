import { Store } from 'express-session';
interface Cookie {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  path: string;
  sameSite: string;
}
interface Permissions {
  permissions: string[];
}
export interface SessionData {
  cookie: Cookie;
  permissions: Permissions;
}

export interface ISessionStore {
  get(sid: string): Promise<string>;
  set(sid: string, data: string, ttlSeconds: number): Promise<void>;
  destroy(sid: string): Promise<void>;
  exist(sid: string): Promise<boolean>;
}

export class ExpressStoreAdapter extends Store {
  constructor(private readonly store: ISessionStore) {
    super();
  }

  get = (sid: string, callback: (err?: any, session?: any) => void) => {
    this.store
      .get(sid)
      .then((data) => callback(null, data ? JSON.parse(data) : null))
      .catch(callback);
  };

  set = (sid: string, session: any, callback?: (err?: any) => void) => {
    this.store
      .set(sid, JSON.stringify(session), 60 * 60) // TTL lo gestionará tu store
      .then(() => callback?.())
      .catch(callback);
  };

  destroy = (sid: string, callback?: (err?: any) => void) => {
    this.store
      .destroy(sid)
      .then(() => callback?.())
      .catch(callback);
  };

  // Opcional: touch, length, clear… si tu interfaz los incluye
}
