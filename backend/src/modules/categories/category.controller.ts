import { CategoryResponseDto } from './dto/category-response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdParamDto } from 'src/common/dto/id-param.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAll();
  }

  @Post()
  create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamDto): Promise<CategoryResponseDto> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdParamDto,
    @Body()
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamDto): Promise<void> {
    return this.categoryService.remove(id);
  }
}
