import { z } from 'zod';

export const ayahParamsSchema = z.object({
  chapter: z.coerce.number().int().min(1).max(114),
  verse: z.coerce.number().int().min(1).max(286),
});

export const tafsirParamsSchema = ayahParamsSchema.extend({
  tafsirId: z.coerce.number().int(),
});

export const linguisticParamsSchema = ayahParamsSchema.extend({
  kind: z.enum(['irab', 'language', 'gharib']),
});
