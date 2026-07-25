import { describe, it, expect } from 'vitest';
import {
  deviceIdSchema,
  updateProgressSchema,
} from '../progress.validation.js';

describe('progress validation', () => {
  it('should accept a valid device id', () => {
    expect(deviceIdSchema.safeParse({ deviceId: 'abcd1234efgh' }).success).toBe(true);
  });

  it('should reject short device ids', () => {
    expect(deviceIdSchema.safeParse({ deviceId: 'abc' }).success).toBe(false);
  });

  it('should accept a valid position update', () => {
    const result = updateProgressSchema.safeParse({
      lastPosition: { chapter: 2, verse: 255 },
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid bookmark keys', () => {
    expect(updateProgressSchema.safeParse({ toggleBookmark: 'abc' }).success).toBe(false);
    expect(updateProgressSchema.safeParse({ toggleBookmark: '2:255' }).success).toBe(true);
  });

  it('should reject out-of-range verse numbers', () => {
    const result = updateProgressSchema.safeParse({
      lastPosition: { chapter: 1, verse: 400 },
    });
    expect(result.success).toBe(false);
  });
});
