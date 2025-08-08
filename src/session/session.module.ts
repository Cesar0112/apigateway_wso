import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SessionConfig } from './session.config';
import { SessionMiddleware } from './session.middleware';
import { SessionService } from './session.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  providers: [ConfigService, SessionConfig, SessionMiddleware, SessionService],
  exports: [SessionMiddleware], // <-- los demás módulos lo reciben
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware) // se monta automáticamente
      .forRoutes('*path'); // sobre todas las rutas
  }
}
