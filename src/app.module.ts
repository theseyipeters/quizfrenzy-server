import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { RoomModule } from './room/room.module';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CategoryModule,
    QuizModule,
    RoomModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

console.log('MongoDB URI:', process.env.MONGODB_URI);
