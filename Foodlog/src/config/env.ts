/**
 * Environment-driven configuration.
 * Values come from EXPO_PUBLIC_* variables (inlined by Metro at build time).
 */
export const ENV = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
  /** Serve local mock data until the backend is wired up. */
  useMockData: (process.env.EXPO_PUBLIC_USE_MOCKS ?? 'true') === 'true',
} as const;
