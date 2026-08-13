import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-expo';

/**
 * Centralized session accessor. Wraps Clerk so the rest of the app has a
 * single, stable auth surface (Section 11 of the product brief).
 */
export function useAuth() {
  const { isLoaded, isSignedIn, userId, signOut, getToken } = useClerkAuth();
  const { user } = useUser();

  return {
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    userId: userId ?? null,
    user,
    signOut,
    getToken,
  };
}
