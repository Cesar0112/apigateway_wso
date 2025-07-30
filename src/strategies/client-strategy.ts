import { ProxyResponse } from 'src/proxy/proxy.interface';

export interface ClientStrategy {
  sendRequest(
    path: string,
    method: string,
    body: any,
    withToken?: boolean,
  ): Promise<unknown>;
}
