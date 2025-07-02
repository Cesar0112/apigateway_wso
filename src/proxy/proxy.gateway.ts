import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { io as ClientIO } from 'socket.io-client';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Cambia por tu frontend
    credentials: true,
  },
  //namespace: '/', // Gateway general
})
export class ProxyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(private readonly configService: ConfigService) {}
  handleConnection(client: Socket) {
    // Para el namespace raíz
    console.log(
      'Nueva conexión socket:',
      client.id,
      'namespace:',
      client.nsp.name,
    );
    const namespace = client.nsp.name;
    this.setupProxy(client, namespace);
  }

  setupProxy(socket: Socket, namespace: string) {
    // Conecta con el microservicio correspondiente según el namespace
    const url = this.configService.get<string>('API_URL');
    console.log('URL', url);

    const backendSocket = ClientIO(url);

    // Redirige todos los eventos del cliente al backend
    socket.onAny((event, ...args) => {
      backendSocket.emit(event, ...args);
    });

    // Redirige todos los eventos del backend al cliente
    backendSocket.onAny((event, ...args) => {
      socket.emit(event, ...args);
    });

    // Maneja desconexión
    socket.on('disconnect', () => {
      backendSocket.disconnect();
    });
  }

  getBackendUrlForNamespace(namespace: string): string {
    // Aquí defines la lógica para mapear namespaces a URLs de microservicios
    if (namespace === '/forensicSearch') {
      return 'http://localhost:10410/forensicSearch';
    }
    if (namespace === '/otroNamespace') {
      return 'http://10.12.24.38:10410/otroNamespace';
    }
    // Por defecto
    return 'http://10.12.24.38:10410/';
  }
}
