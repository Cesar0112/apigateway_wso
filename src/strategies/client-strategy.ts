import { AxiosResponse } from 'axios';

export interface ClientStrategy {
  sendRequest(
    path: string,
    method: string,
    body: any,
    withToken?: boolean,
  ): Promise<AxiosResponse>;
}
