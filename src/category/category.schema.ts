import { Schema, Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  description: string;
}

// Define the Category schema
export const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});
