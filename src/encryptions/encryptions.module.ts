import { Module } from '@nestjs/common';
import { EncryptionsService } from './encryptions.service';
import { EncryptionsController } from './encryptions.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
  providers: [EncryptionsService, RedisService],
  controllers: [EncryptionsController],
})
export class EncryptionsModule {}
