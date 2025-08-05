import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { createClient } from 'redis';
import { SessionConfig } from './session.config';
const RedisStore = require('connect-redis').RedisStore;
@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private middleware: ReturnType<typeof session>;
  constructor(cfg: SessionConfig) {
    const redisClient = createClient({ ...cfg.redis });
    redisClient
      .connect()
      .then(() => {
        const redisStore: session.Store = new RedisStore({
          client: redisClient,
        });

        this.middleware = session({
          store: redisStore,
          name: cfg.cookieName,
          secret: cfg.secret,
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: cfg.ttlSeconds * 1000,
            sameSite: 'lax',
          },
        });
      })
      .catch((err) => {
        console.error('Redis connection error:', err);
      });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.middleware(req, res, next);
  }
}
