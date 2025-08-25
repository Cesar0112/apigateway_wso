import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SessionConfig } from './session.config';
import { SessionMiddleware } from './session.middleware';
import { ConfigModule } from '../config/config.module';
import { SessionService } from './session.service';
import { ConfigService } from '../config/config.service';
import { SessionGateway } from '../auth/session.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot()],
  providers: [
    SessionConfig,
    SessionMiddleware,
    SessionService,
    ConfigService,
    SessionGateway,
    /*{
      provide: 'SESSION_STRATEGY',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        switch (cfg.getConfig().SESSION?.STRATEGY) {
          case 'redis':
            return new RedisSessionStrategy(new Redis());

          default:
            throw new Error('No session store configured');
        }
      },
    },
    {
      provide: SessionRepository,
      useFactory: (strategy: any) => new SessionRepository(strategy),
      inject: ['SESSION_STRATEGY'],
    },*/
  ],
  exports: [SessionService],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
