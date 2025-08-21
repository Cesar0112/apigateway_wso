import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { ProxyGateway } from './proxy.gateway';
import { ProxyScopeGuard } from '../proxy/proxy-scope.guard';
import { ProxyConfigService } from './proxy-config.service';
import { EncryptionsService } from '../encryptions/encryptions.service';
import { SessionModule } from '../session/session.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
@Module({
  controllers: [ProxyController],
  imports: [SessionModule, ConfigModule],
  providers: [
    ConfigService,
    ProxyGateway,
    ProxyService,
    ProxyConfigService,
    ProxyScopeGuard,
    EncryptionsService,
  ],
})
export class ProxyModule {}
