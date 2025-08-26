import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SessionConfig } from './session.config';
import { SessionMiddleware } from './session.middleware';
import { ConfigModule } from '../config/config.module';
import { SessionService } from './session.service';
import { ConfigService } from '../config/config.service';
import { SessionGateway } from './session.gateway';
import { SessionTimerService } from './session-timer.service';

@Module({
  imports: [ConfigModule],
  providers: [
    SessionConfig,
    SessionMiddleware,
    SessionService,
    ConfigService,
    SessionTimerService,
    SessionGateway,
  ],
  exports: [SessionService, SessionTimerService],
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
