import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/auth/guards/ws-auth.guard';

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() data: string): void {
    this.server.emit('send_message', data);
  }

  @SubscribeMessage('join')
  receiveNewMessage(@MessageBody() data: string): void {
    console.log(`joined: ${data}`);
  }

  afterInit(): void {
    console.log('Websocket gateway initialized.');
  }

  async handleConnection(client: Socket) {
    this.server.emit('join',  `A new member joined the chat with id: ${client.id}`);
    console.log(`WS client with id: ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    this.server.emit('join', `A new member leaved the chat with id: ${client.id}`);
    console.log(`WS client with id: ${client.id} disconnected.`);
  }
}
