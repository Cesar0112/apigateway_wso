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
import { ProxyGateway } from './proxy.gateway';
import { AxiosResponse } from 'axios';

@Controller('*path')
@UseGuards(SessionTokenGuard)
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly gatewayService: ProxyGateway,
  ) {}

  @All()
  async handleAllHTTPRequests(@Req() req: Request, @Res() res: Response) {
    try {
      //Determinar el canal dinámicamente
      const channel: Channel =
        (req.headers['x-channel'] as Channel) || Channel.HTTP;
      console.log('Petición');

      const response: AxiosResponse = await this.proxyService.sendRequest(
        req.path,
        req.method,
        req.body,
        channel,
      );

      res.status(200);

      return response.data;
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
