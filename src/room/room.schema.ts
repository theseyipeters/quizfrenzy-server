import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  host: string; // The host's username or ID

  @Prop({ required: true })
  category: string; // Category (e.g., Music, Politics)

  @Prop({ type: [String], default: [] })
  players: string[]; // List of player usernames or IDs

  @Prop({ required: true })
  roomCode: string; // Unique room code/link
}

export const RoomSchema = SchemaFactory.createForClass(Room);
