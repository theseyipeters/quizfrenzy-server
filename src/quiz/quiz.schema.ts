import { Schema, Document } from 'mongoose';

export interface Quiz extends Document {
  question: string;
  options: string[];
  answer: string;
  hint: string;
  category: string;
  description: string;
}

export const QuizSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  hint: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});
