import { Injectable } from '@nestjs/common';
import { Keyv } from 'keyv';
import { ConfigService } from '../config/config.service';
import * as session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { createKeyv as createKeyvRedis } from '@keyv/redis';
import { createKeyv as createKeyvSQLite } from '@keyv/sqlite';
import { SessionData } from './interfaces/session.interface';

//import { SessionData } from './interfaces/session.interface';

@Injectable()
export class SessionService {
  constructor(private readonly cfg: ConfigService) {}

  getStore(): Keyv {
    const { STRATEGY, URL } = this.cfg.getConfig().SESSION ?? {
      STRATEGY: 'redis',
      URL: 'redis://localhost:6379',
    };

    switch (STRATEGY) {
      case 'redis': {
        const store = createKeyvRedis(URL);
        return store;
      }
      case 'sqlite': {
        const store = createKeyvSQLite({ uri: URL });
        return store;
      }
      default:
        return new Keyv();
    }
  }
  async refresh(sessionID: string, sessionData: SessionData): Promise<boolean> {
    const store = this.getExpressSessionStore();

    return new Promise((resolve) => {
      if (typeof store.touch !== 'function') {
        // If the store doesn't support touch, cannot refresh session TTL.
        resolve(false);
        return;
      }

      store.touch(sessionID, sessionData);
    });
  }
  getExpressSessionStore(): session.Store {
    const { STRATEGY, URL } = this.cfg.getConfig().SESSION ?? {
      STRATEGY: 'redis',
      URL: 'redis://localhost:6379',
    };

    switch (STRATEGY) {
      case 'redis': {
        const redisClient = createClient({ url: URL });
        redisClient.connect().catch(console.error);

        // Initialize store.
        const redisStore = new RedisStore({
          client: redisClient,
        });
        return redisStore as unknown as session.Store;
      }
      case 'sqlite': {
        const connectSqlite3 = require('connect-sqlite3');
        const SQLiteStore = connectSqlite3(session);
        return new SQLiteStore({
          db: 'sessions.sqlite',
          dir: './db',
        }) as unknown as session.Store;
      }
      default:
        return new session.MemoryStore();
    }
  }
  getSession(sessionID: string): Promise<SessionData | null> {
    const store = this.getExpressSessionStore();

    return new Promise((resolve, reject) =>
      store.get(sessionID, (err, data) => {
        if (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          reject(error);
          return;
        }
        resolve(data as SessionData | null);
      }),
    );
  }
  isExpired(session: SessionData): boolean {
    const expires: Date = session.cookie?.expires as Date;
    return expires && Date.now() > new Date(expires).getTime();
  }
  deleteSession(sessionId: string): Promise<void> {
    const store = this.getExpressSessionStore();
    return new Promise((resolve, reject) =>
      store.destroy(sessionId, (err) => {
        if (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          reject(error);
          return;
        }
        resolve();
      }),
    );
  }
}
