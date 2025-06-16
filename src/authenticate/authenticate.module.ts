import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { EncryptionsService } from 'src/encryptions/encryptions.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  providers: [AuthenticateService, EncryptionsService, PermissionsService],
  controllers: [AuthenticateController],
})
export class AuthenticateModule {}
