import { describe, it, expect } from 'vitest';
import {
  versesParamsSchema,
  versesQuerySchema,
} from '../quran.validation.js';

describe('quran validation', () => {
  it('should accept a valid chapter id', () => {
    expect(versesParamsSchema.safeParse({ chapterId: '2' }).success).toBe(true);
  });

  it('should reject chapter ids outside 1-114', () => {
    expect(versesParamsSchema.safeParse({ chapterId: '115' }).success).toBe(false);
    expect(versesParamsSchema.safeParse({ chapterId: '0' }).success).toBe(false);
  });

  it('should apply query defaults', () => {
    const result = versesQuerySchema.parse({});
    expect(result).toEqual({ page: 1, perPage: 50, reciter: 7 });
  });

  it('should cap perPage at 100', () => {
    expect(versesQuerySchema.safeParse({ perPage: '500' }).success).toBe(false);
  });
});
