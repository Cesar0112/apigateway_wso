import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateController } from './auth.controller';
import { EncryptionsService } from '../encryptions/encryptions.service';
import { PermissionsService } from '../permissions/permissions.service';
import { SessionModule } from '../session/session.module';
import { ConfigService } from '../config/config.service';
import { AUTH_SERVICE_TOKEN } from './auth.interface';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [SessionModule],
  providers: [
    ConfigService,
    EncryptionsService,
    PermissionsService,
    {
      provide: AUTH_SERVICE_TOKEN,
      useFactory(cfg: ConfigService) {
        const authType = cfg.getConfig().API_GATEWAY?.AUTH_TYPE;
        const encServ = new EncryptionsService(cfg);
        const perServ = new PermissionsService(cfg);
        const sessServ = new SessionService(cfg);
        switch (authType) {
          case 'wso2':
            return new AuthService(cfg, encServ, perServ, sessServ);
          default:
            return new AuthService(cfg, encServ, perServ, sessServ);
        }
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
