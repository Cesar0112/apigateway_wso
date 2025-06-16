import { ClientStrategy } from './client-strategy';
import * as env from '../config';
export class HttpClientStrategy implements ClientStrategy {
  async sendRequest(path: string, method: string, body: any): Promise<any> {
    // Implementación de la estrategia HTTP
    return await fetch(`${env.API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
