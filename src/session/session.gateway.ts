import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SessionTimerService } from './session-timer.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Cambia por tu frontend
    credentials: true,
  },
  allowEIO3: true,
})
export class SessionGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly timer: SessionTimerService) {}

  @SubscribeMessage('session:auth-login')
  onLogin(
    @MessageBody() body: { sessionId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.timer.registerSocket(body.sessionId, socket);
    this.timer.start(body.sessionId);
  }

  handleDisconnect(socket: Socket) {
    const sid = [...this.timer['sockets']].find(([, s]) => s === socket)?.[0];
    if (sid) {
      this.timer.unregisterSocket(sid);
      this.timer.stop(sid); // cancela timers
    }
  }
}
