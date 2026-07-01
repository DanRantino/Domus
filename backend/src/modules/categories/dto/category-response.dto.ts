import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const categoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export class CategoryResponseDto extends createZodDto(categoryResponseSchema) {}
