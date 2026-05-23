/**
 * Error message constants for consistent error handling
 */

export const ERROR_MESSAGES = {
  LOCATION_NOT_FOUND: 'Could not find location',
  API_CALL_FAILED: 'API call failed',
  NETWORK_ERROR: 'Failed to fetch',
  UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;

export const USER_FRIENDLY_ERRORS: Record<string, { title: string; message: string }> = {
  [ERROR_MESSAGES.LOCATION_NOT_FOUND]: {
    title: 'Location Not Found',
    message: "Sorry, we couldn't find that city. Please check the spelling and try again.",
  },
  [ERROR_MESSAGES.API_CALL_FAILED]: {
    title: 'Service Unavailable',
    message: 'The weather service is temporarily unavailable. Please try again in a few moments.',
  },
  [ERROR_MESSAGES.NETWORK_ERROR]: {
    title: 'Network Error',
    message: 'Please check your internet connection and try again.',
  },
};

/**
 * Get user-friendly error message based on error text
 */
export const getUserFriendlyError = (
  errorMsg: string
): { title: string; message: string } => {
  for (const [key, value] of Object.entries(USER_FRIENDLY_ERRORS)) {
    if (errorMsg.includes(key)) {
      return value;
    }
  }

  return {
    title: 'Error',
    message: 'Oops! Something went wrong while fetching the weather. Please try again later.',
  };
};
