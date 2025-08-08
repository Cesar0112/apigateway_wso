import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { EncryptionsModule } from './encryptions/encryptions.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProxyModule } from './proxy/proxy.module';
import { CustomRedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { StructuresModule } from './structures/structures.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ConfigService } from './config/config.service';
import { ConfigController } from './config/config.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CustomRedisModule,
    AuthenticateModule,
    EncryptionsModule,
    RolesModule,
    PermissionsModule,
    ProxyModule,
    SessionModule,
    UsersModule,
    StructuresModule,
    WebhooksModule,
  ],
  controllers: [AppController, ConfigController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
