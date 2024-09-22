import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway {
  constructor(private roomService: RoomService) {}

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    client: any,
    payload: { host: string; category: string },
  ) {
    const room = await this.roomService.createRoom(
      payload.host,
      payload.category,
    );
    client.emit('roomCreated', room);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: any,
    payload: { roomCode: string; player: string },
  ) {
    const room = await this.roomService.joinRoom(
      payload.roomCode,
      payload.player,
    );
    if (room) {
      client.emit('joinedRoom', room);
    } else {
      client.emit('error', 'Room not found');
    }
  }
}
