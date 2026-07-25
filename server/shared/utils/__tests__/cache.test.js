import { describe, it, expect, vi, afterEach } from 'vitest';
import { cacheGet, cacheSet } from '../cache.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('cache', () => {
  it('should return stored value before TTL expires', () => {
    cacheSet('key-a', { value: 1 }, 1000);
    expect(cacheGet('key-a')).toEqual({ value: 1 });
  });

  it('should return null for missing keys', () => {
    expect(cacheGet('missing-key')).toBeNull();
  });

  it('should expire entries after TTL', () => {
    vi.useFakeTimers();
    cacheSet('key-b', 'data', 500);
    vi.advanceTimersByTime(600);
    expect(cacheGet('key-b')).toBeNull();
  });
});
