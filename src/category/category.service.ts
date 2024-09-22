import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  // Method to create a new category
  async createCategory(name: string, description: string): Promise<Category> {
    // Check if the category already exists
    const existingCategory = await this.categoryModel.findOne({ name });
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const newCategory = new this.categoryModel({ name, description });
    return newCategory.save();
  }

  async updateCategory(name: string, description: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ name });
    if (!category) {
      throw new ConflictException('Category not found');
    }
    category.description = description;
    return category.save();
  }

  // Method to fetch all categories
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
