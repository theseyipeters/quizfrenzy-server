import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.schema';
import { Category } from 'src/category/category.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>, // Inject the Category model
  ) {}

  // Method to create and store the quiz in MongoDB
  async createQuiz(createQuizDto: {
    question: string;
    options: string[];
    answer: string;
    category: string;
    hint: string;
    description: string;
  }): Promise<Quiz> {
    // Check if a quiz with the same question and category exists
    const existingQuiz = await this.quizModel.findOne({
      question: createQuizDto.question,
      hint: createQuizDto.hint,
    });
    if (existingQuiz) {
      throw new ConflictException(
        'Quiz with this question already exists in this category.',
      );
    }

    // Check if the category exists, if not create it
    const existingCategory = await this.categoryModel.findOne({
      name: createQuizDto.category,
    });

    if (!existingCategory) {
      throw new ConflictException('Invalid category');
    }

    // Create the quiz with the category ID
    const createdQuiz = new this.quizModel({
      ...createQuizDto,
    });

    return createdQuiz.save();
  }

  // Method to update quiz in MongoDB
  async updateQuiz(updateQuizDto: {
    _id: string; // Frontend will pass the _id
    question: string;
    options: string[];
    answer: string;
    category: string;
    hint: string;
    description: string;
  }): Promise<Quiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(
      updateQuizDto._id,
      updateQuizDto,
      { new: true },
    );
    return updatedQuiz;
  }

  // Method to get all quizzes
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Method to get quizzes by category
  async getQuestionsByCategory(category: string): Promise<Quiz[]> {
    return this.quizModel.find({ category }).exec();
  }
}
