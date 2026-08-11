import type { Restaurant, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Aditi Rao',
    username: 'aditi',
    bio: 'Chasing the best biryani in the city.',
    location: 'Hyderabad',
    createdAt: '2026-01-04T10:00:00.000Z',
  },
  {
    id: 'u2',
    name: 'Rahul Mehta',
    username: 'rahul',
    bio: 'Cafes, filter coffee, repeat.',
    location: 'Hyderabad',
    createdAt: '2026-01-06T10:00:00.000Z',
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Bawarchi',
    address: 'RTC X Roads, Hyderabad',
    cuisine: ['Hyderabadi', 'Biryani'],
    images: [],
    priceLevel: 2,
    averageRating: 4.4,
  },
  {
    id: 'r2',
    name: 'Roastery Coffee House',
    address: 'Banjara Hills, Hyderabad',
    cuisine: ['Cafe', 'Continental'],
    images: [],
    priceLevel: 3,
    averageRating: 4.6,
  },
];
