import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getWeatherInterpretation,
  fetchWeatherForCity,
  fetchCitySuggestions,
} from './weatherService';

// Mock fetch globally
global.fetch = vi.fn();

describe('weatherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWeatherInterpretation', () => {
    it('should return clear sky for weather code 0 during day', () => {
      const result = getWeatherInterpretation(0, true);
      expect(result.description).toBe('Clear sky');
      expect(result.Icon).toBeDefined();
    });

    it('should return clear sky for weather code 0 during night', () => {
      const result = getWeatherInterpretation(0, false);
      expect(result.description).toBe('Clear sky');
      expect(result.Icon).toBeDefined();
    });

    it('should return moderate rain for weather code 63', () => {
      const result = getWeatherInterpretation(63, true);
      expect(result.description).toBe('Moderate rain');
    });

    it('should return thunderstorm for weather code 95', () => {
      const result = getWeatherInterpretation(95, true);
      expect(result.description).toBe('Thunderstorm');
    });

    it('should return unknown for invalid weather code', () => {
      const result = getWeatherInterpretation(999, true);
      expect(result.description).toBe('Unknown');
    });
  });

  describe('fetchCitySuggestions', () => {
    it('should return empty array for query shorter than 2 characters', async () => {
      const result = await fetchCitySuggestions('a');
      expect(result).toEqual([]);
    });

    it('should return city suggestions for valid query', async () => {
      const mockData = {
        results: [
          {
            id: 1,
            name: 'London',
            country: 'United Kingdom',
            latitude: 51.5085,
            longitude: -0.1257,
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchCitySuggestions('London');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('London');
    });

    it('should return empty array when API returns no results', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: null }),
      });

      const result = await fetchCitySuggestions('xyz');
      expect(result).toEqual([]);
    });

    it('should handle API errors gracefully', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchCitySuggestions('London');
      expect(result).toEqual([]);
    });
  });

  describe('fetchWeatherForCity', () => {
    it('should throw error when city is not found', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [] }),
      });

      await expect(fetchWeatherForCity('NonexistentCity123')).rejects.toThrow(
        'Could not find location: NonexistentCity123'
      );
    });
  });
});
