import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './quiz.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    CategoryModule,
  ],
  controllers: [QuizController], // Controller to handle HTTP requests
  providers: [QuizService], // Service for business logic
})
export class QuizModule {}
