import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateController } from './auth.controller';
import { EncryptionsService } from '../encryptions/encryptions.service';
import { PermissionsService } from '../permissions/permissions.service';
import { SessionModule } from '../session/session.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [SessionModule],
  providers: [
    ConfigService,
    AuthService,
    EncryptionsService,
    PermissionsService,
  ],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
