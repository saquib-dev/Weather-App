import { describe, it, expect } from 'vitest';
import { isCitySuggestion, isString } from './typeGuards';

describe('typeGuards', () => {
  describe('isCitySuggestion', () => {
    it('should return true for valid CitySuggestion object', () => {
      const suggestion = {
        id: 1,
        name: 'London',
        country: 'United Kingdom',
        latitude: 51.5085,
        longitude: -0.1257,
      };

      expect(isCitySuggestion(suggestion)).toBe(true);
    });

    it('should return false for invalid CitySuggestion object', () => {
      const invalid = {
        id: 'invalid',
        name: 'London',
        country: 'United Kingdom',
        latitude: 51.5085,
        longitude: -0.1257,
      };

      expect(isCitySuggestion(invalid)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isCitySuggestion(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isCitySuggestion(undefined)).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true for string', () => {
      expect(isString('hello')).toBe(true);
    });

    it('should return false for non-string', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString({})).toBe(false);
    });
  });
});
