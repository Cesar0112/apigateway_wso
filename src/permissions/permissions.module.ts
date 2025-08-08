import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { ConfigService } from 'src/config/config.service';

@Module({
  controllers: [PermissionsController],
  providers: [ConfigService, PermissionsService],
})
export class PermissionsModule {}
