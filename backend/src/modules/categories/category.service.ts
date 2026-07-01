import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const existingCategory = await this.categoryRepository.exists({
      where: {
        name: createCategoryDto.name,
        deletedAt: IsNull(),
      },
    });
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    return this.categoryRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    return this.findCategoryOrFail(id);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.findCategoryOrFail(id);
    return this.categoryRepository.save({ ...category, ...updateCategoryDto });
  }

  async remove(id: string): Promise<void> {
    await this.findCategoryOrFail(id);
    await this.categoryRepository.softDelete(id);
  }

  private async findCategoryOrFail(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
