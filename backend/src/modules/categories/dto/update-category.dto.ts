import { CreateCategorySchema } from './category.schema';
import { z } from 'zod';

export const UpdateCategorySchema = CreateCategorySchema.partial().strict();

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
