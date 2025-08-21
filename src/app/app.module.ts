import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateModule } from '../auth/auth.module';
import { EncryptionsModule } from '../encryptions/encryptions.module';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { ProxyModule } from '../proxy/proxy.module';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { StructuresModule } from '../structures/structures.module';
import { ConfigService } from '../config/config.service';
import { ConfigController } from '../config/config.controller';
import { ConfigModule } from '../config/config.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SessionService } from '../session/session.service';
@Module({
  imports: [
    ConfigModule,
    SessionModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [SessionModule],
      useFactory: (ss: SessionService) => {
        return {
          stores: [ss.getStore()],
        };
      },
      inject: [SessionService],
    }),
    AuthenticateModule,
    EncryptionsModule,
    RolesModule,
    PermissionsModule,
    ProxyModule,
    UsersModule,
    StructuresModule,
  ],
  controllers: [AppController, ConfigController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
