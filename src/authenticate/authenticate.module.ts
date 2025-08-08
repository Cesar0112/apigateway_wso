import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { EncryptionsService } from 'src/encryptions/encryptions.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { SessionModule } from 'src/session/session.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [SessionModule],
  providers: [
    ConfigService,
    AuthenticateService,
    EncryptionsService,
    PermissionsService,
  ],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
