import { z } from 'zod';

export const deviceIdSchema = z.object({
  deviceId: z.string().min(8).max(64),
});

export const updateProgressSchema = z.object({
  lastPosition: z
    .object({
      chapter: z.number().int().min(1).max(114),
      verse: z.number().int().min(1).max(286),
    })
    .optional(),
  toggleBookmark: z
    .string()
    .regex(/^\d{1,3}:\d{1,3}$/)
    .optional(),
});
