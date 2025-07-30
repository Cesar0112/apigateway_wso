import { Injectable } from '@nestjs/common';
import * as strategies from '../strategies';
import { Channel } from './proxy.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProxyService {
  async sendRequest(
    path: string,
    method: string,
    body: any,
    channel: Channel,
  ): Promise<AxiosResponse> {
    let strategy: strategies.ClientStrategy;

    switch (channel) {
      case Channel.HTTP:
        strategy = new strategies.HttpClientStrategy();
        break;
      case Channel.NATS:
        strategy = new strategies.NatsClientStrategy();
        break;
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }

    return await strategy.sendRequest(path, method, body);
  }
}
