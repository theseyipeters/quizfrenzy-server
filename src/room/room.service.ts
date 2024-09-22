import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async createRoom(host: string, category: string): Promise<Room> {
    const roomCode = Math.random().toString(36).substring(2, 8); // Simple room code generator
    const newRoom = new this.roomModel({ host, category, roomCode });
    return newRoom.save();
  }

  async joinRoom(roomCode: string, player: string): Promise<Room> {
    const room = await this.roomModel.findOne({ roomCode });
    if (room) {
      room.players.push(player);
      return room.save();
    }
    return null;
  }

  async getRoom(roomCode: string): Promise<Room> {
    return this.roomModel.findOne({ roomCode });
  }
}
