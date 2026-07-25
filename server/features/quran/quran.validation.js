import { z } from 'zod';

export const versesParamsSchema = z.object({
  chapterId: z.coerce.number().int().min(1).max(114),
});

export const versesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(50),
  reciter: z.coerce.number().int().min(1).max(200).default(7),
});
