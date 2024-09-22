import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomSchema } from './room.schema';
import { RoomGateway } from './room.gateway'; // WebSocket gateway

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]), // Register Room schema
  ],
  controllers: [RoomController], // Controller to handle HTTP requests
  providers: [RoomService, RoomGateway], // Service for business logic and WebSocket gateway for real-time functionality
})
export class RoomModule {}
