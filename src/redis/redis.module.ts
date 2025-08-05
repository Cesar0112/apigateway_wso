// src/redis/redis.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'single',
        url: cfg.get<string>('REDIS_URL', 'redis://localhost:6379'),
        options: {
          tls: cfg.get<string>('NODE_ENV') === 'production' ? {} : undefined,
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 3,
        },
      }),
    }),
  ],
  exports: [RedisModule, RedisService],
  providers: [RedisService],
})
export class CustomRedisModule {}
