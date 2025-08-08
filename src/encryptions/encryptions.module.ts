import { Module } from '@nestjs/common';
import { EncryptionsService } from './encryptions.service';
import { EncryptionsController } from './encryptions.controller';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from 'src/config/config.service';

@Module({
  providers: [ConfigService, EncryptionsService, RedisService],
  controllers: [EncryptionsController],
})
export class EncryptionsModule {}
