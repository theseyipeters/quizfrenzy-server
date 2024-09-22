import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('rooms') // Endpoint base for rooms
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async createRoom(
    @Body() createRoomDto: { host: string; category: string },
  ): Promise<Room> {
    return this.roomService.createRoom(
      createRoomDto.host,
      createRoomDto.category,
    );
  }

  @Post('join/:roomCode')
  async joinRoom(
    @Param('roomCode') roomCode: string,
    @Body() playerDto: { player: string },
  ): Promise<Room> {
    return this.roomService.joinRoom(roomCode, playerDto.player);
  }

  @Get(':roomCode')
  async getRoom(@Param('roomCode') roomCode: string): Promise<Room> {
    return this.roomService.getRoom(roomCode);
  }
}
