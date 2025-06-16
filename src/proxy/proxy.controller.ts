import {
  Controller,
  All,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';
import { Channel } from './proxy.interface';
import { SessionTokenGuard } from '../guards/session-token.guard';

@Controller('*path')
@UseGuards(SessionTokenGuard)
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async handleAllRequests(@Req() req: Request, @Res() res: Response) {
    try {
      //Determinar el canal dinámicamente
      const channel: Channel =
        (req.headers['x-channel'] as Channel) || Channel.HTTP;

      const response = await this.proxyService.sendRequest(
        req.path,
        req.method,
        req.body,
        channel,
      );

      res
        .status(response?.status || HttpStatus.OK)
        .set(response?.headers || {})
        .send(response?.body || '');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
