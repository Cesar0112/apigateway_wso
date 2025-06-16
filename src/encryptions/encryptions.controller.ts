import { Controller, UseGuards } from '@nestjs/common';
import { SessionTokenGuard } from '../guards/session-token.guard';

@Controller('encryptions')
@UseGuards(SessionTokenGuard)
export class EncryptionsController {}
