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

  it('should accept a valid wird increment', () => {
    const result = updateProgressSchema.safeParse({
      wird: { date: '2026-07-26', delta: 5 },
    });
    expect(result.success).toBe(true);
  });

  it('should reject malformed wird dates and zero deltas', () => {
    expect(
      updateProgressSchema.safeParse({ wird: { date: '26/07/2026', delta: 5 } }).success
    ).toBe(false);
    expect(
      updateProgressSchema.safeParse({ wird: { date: '2026-07-26', delta: 0 } }).success
    ).toBe(false);
  });

  it('should bound dailyGoal between 1 and 500', () => {
    expect(updateProgressSchema.safeParse({ dailyGoal: 10 }).success).toBe(true);
    expect(updateProgressSchema.safeParse({ dailyGoal: 0 }).success).toBe(false);
    expect(updateProgressSchema.safeParse({ dailyGoal: 501 }).success).toBe(false);
  });

  it('should reject out-of-range verse numbers', () => {
    const result = updateProgressSchema.safeParse({
      lastPosition: { chapter: 1, verse: 400 },
    });
    expect(result.success).toBe(false);
  });
});
