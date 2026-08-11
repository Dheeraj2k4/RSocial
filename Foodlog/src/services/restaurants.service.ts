import { ENV } from '@/config/env';
import { apiRequest } from '@/services/api/client';
import { mockRestaurants } from '@/services/mock/data';
import type { Restaurant } from '@/types';

/**
 * Restaurant data access. UI/hooks depend on this abstraction, not on fetch
 * or mock data directly — so swapping to a real backend is a one-file change.
 */
export const restaurantsService = {
  async list(): Promise<Restaurant[]> {
    if (ENV.useMockData) return mockRestaurants;
    return apiRequest<Restaurant[]>('/restaurants');
  },

  async getById(id: string): Promise<Restaurant | null> {
    if (ENV.useMockData) return mockRestaurants.find((r) => r.id === id) ?? null;
    return apiRequest<Restaurant>(`/restaurants/${id}`);
  },
};
