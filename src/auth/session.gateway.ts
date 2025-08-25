import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  //SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SessionService } from '../session/session.service';
import { SessionData } from '../session/interfaces/session.interface';
import { ConfigService } from 'src/config/config.service';
import * as session from 'express-session';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Cambia por tu frontend
    credentials: true,
  },
  allowEIO3: true,
})
export class SessionGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly sessionService: SessionService,

    private readonly cfg: ConfigService,
  ) {}

  @SubscribeMessage('session:auth-login')
  onLogin(
    @MessageBody() body: { sessionId: string },
    @ConnectedSocket() socket: Socket,
  ) {}
}
