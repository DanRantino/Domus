import { z } from 'zod';

export const CategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
});

export type CategoryResponseDto = z.infer<typeof CategoryResponseSchema>;
