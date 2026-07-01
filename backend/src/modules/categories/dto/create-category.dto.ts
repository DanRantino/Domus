import { CreateCategorySchema } from './category.schema';
import { z } from 'zod';

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
