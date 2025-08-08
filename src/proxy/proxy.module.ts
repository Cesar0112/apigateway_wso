import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { ProxyGateway } from './proxy.gateway';
import { ProxyScopeGuard } from 'src/proxy/proxy-scope.guard';
import { ProxyConfigService } from './proxy-config.service';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  controllers: [ProxyController],
  providers: [
    RedisService,
    ProxyService,
    ProxyConfigService,
    ProxyGateway,
    ProxyScopeGuard,
    ConfigService,
  ],
})
export class ProxyModule {}
