import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SessionConfig } from './session.config';
import { SessionMiddleware } from './session.middleware';
import { SessionService } from './session.service';

@Module({
  imports: [ConfigModule], // lee variables de entorno
  providers: [SessionConfig, SessionMiddleware, SessionService],
  exports: [SessionMiddleware], // <-- los demás módulos lo reciben
})
export class SessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware) // se monta automáticamente
      .forRoutes('*path'); // sobre todas las rutas
  }
}
