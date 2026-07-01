import { createZodDto } from 'nestjs-zod';
import { createCategorySchema } from './category.schema';

export const updateCategorySchema = createCategorySchema.partial().strict();
export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
