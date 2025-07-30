import { Module } from '@nestjs/common';
import { EncryptionsService } from './encryptions.service';
import { EncryptionsController } from './encryptions.controller';

@Module({
  providers: [EncryptionsService],
  controllers: [EncryptionsController],
})
export class EncryptionsModule {}
