import { CitySuggestion } from '../types';

/**
 * Type guard to check if a value is a CitySuggestion object
 */
export const isCitySuggestion = (value: unknown): value is CitySuggestion => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.country === 'string' &&
    typeof obj.latitude === 'number' &&
    typeof obj.longitude === 'number'
  );
};

/**
 * Type guard to check if a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
