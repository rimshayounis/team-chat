
//message.gateway


import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoin(
    @MessageBody() data: { channel: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.channel);
    client.emit('joinedRoom', { channel: data.channel });
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { channel: string; user: string; message: string },
  ) {
    if (data.channel) {
      this.server.to(data.channel).emit('receiveMessage', data);
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { channel: string; user: string },
  ) {
    if (data.channel && data.user) {
      this.server.to(data.channel).emit('typing', data);
    }
  }
}
