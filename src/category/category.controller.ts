import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Route to create a new category
  @Post()
  async createCategory(
    @Body()
    createCategoryDto: {
      name: string;
      description: string;
    },
  ): Promise<{ message: string; data: Category }> {
    const category = await this.categoryService.createCategory(
      createCategoryDto.name,
      createCategoryDto.description,
    );
    return {
      message: 'Category added successfully',
      data: category,
    };
  }

  // Route to fetch all categories
  @Get(`/all`)
  async getAllCategories(): Promise<{ message: string; data: Category[] }> {
    const categories = await this.categoryService.getAllCategories();
    return {
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  @Patch(`/one/:id`)
  async updateCategory(
    @Body()
    updateCategoryDto: {
      name: string;
      description: string;
    },
    @Param('id') id: string,
  ): Promise<{ message: string; data: Category }> {
    const category = await this.categoryService.updateCategory(
      //   id,
      updateCategoryDto.name,
      updateCategoryDto.description,
    );
    return {
      message: 'Category updated successfully',
      data: category,
    };
  }
}
