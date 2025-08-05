import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RedisService],
})
export class RolesModule {}
