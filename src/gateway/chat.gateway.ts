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
  sendMessage(@MessageBody() data: string): string {
    this.server.emit('receive_message', data);
    console.log(`sent: ${data}`);
    return data;
  }

  @SubscribeMessage('receive_message')
  receiveNewMessage(@MessageBody() data: string): string {
    console.log(`received: ${data}`);
    return data;
  }

  afterInit(): void {
    console.log('Websocket gateway initialized.');
  }

  async handleConnection(client: Socket) {
    console.log(`WS client with id: ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    console.log(`WS client with id: ${client.id} disconnected.`);
  }
}
