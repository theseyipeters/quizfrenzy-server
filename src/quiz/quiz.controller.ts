import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.schema';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(
    @Body()
    createQuizDto: {
      question: string;
      options: string[];
      answer: string;
      category: string;
      hint: string;
      description: string;
    },
  ): Promise<{ message: string; data: Quiz }> {
    const quiz = await this.quizService.createQuiz(createQuizDto);
    return {
      message: 'Quiz added successfully',
      data: quiz,
    };
  }

  // Route to get all quizzes
  @Get('/all')
  async getAllQuizzes(): Promise<{ message: string; data: Quiz[] }> {
    const allQuizzes = await this.quizService.getAllQuizzes();
    return {
      message: 'Quizzes fetched successfully',
      data: allQuizzes,
    };
  }

  // Route to get quizzes by category
  @Get()
  async getQuestions(
    @Query('category') category: string,
  ): Promise<{ message: string; data: Quiz[] }> {
    const quizzes = await this.quizService.getQuestionsByCategory(category);

    return {
      message: 'Quizzes fetched successfully',
      data: quizzes,
    };
  }
}
