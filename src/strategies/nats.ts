import { ClientStrategy } from './client-strategy';

export class NatsClientStrategy implements ClientStrategy {
  constructor(private readonly natsClient?: any) {
    //TODO Terminar implementación con NATS
    this.natsClient = natsClient;
  }

  async sendRequest(path: string, method: string, body: any): Promise<any> {
    return await this.natsClient?.send(path, { method, body }).toPromise();
  }
}
