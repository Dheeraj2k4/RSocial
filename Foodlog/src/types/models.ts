/**
 * Core domain models for Foodlog.
 * These mirror the product data model and are shared across services, hooks and UI.
 */

export type ID = string;

export type Visibility = 'public' | 'private';

/** 1–4 price tier (₹ … ₹₹₹₹). */
export type PriceLevel = 1 | 2 | 3 | 4;

/** 1–5 star rating. */
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: ID;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  location?: string;
  createdAt: string;
}

export interface Restaurant {
  id: ID;
  name: string;
  address: string;
  cuisine: string[];
  latitude?: number;
  longitude?: number;
  images: string[];
  priceLevel?: PriceLevel;
  /** Aggregate rating; personal/social signals live elsewhere. */
  averageRating?: number;
}

export interface Review {
  id: ID;
  userId: ID;
  restaurantId: ID;
  rating: Rating;
  review?: string;
  photos?: string[];
  visitedAt?: string;
  createdAt: string;
}

export interface Follow {
  followerId: ID;
  followingId: ID;
}

export interface Like {
  userId: ID;
  activityId: ID;
}

export interface Comment {
  id: ID;
  userId: ID;
  activityId: ID;
  text: string;
  createdAt: string;
}

export interface RestaurantList {
  id: ID;
  ownerId: ID;
  title: string;
  description?: string;
  coverImage?: string;
  visibility: Visibility;
  createdAt: string;
}

export interface ListItem {
  listId: ID;
  restaurantId: ID;
  position: number;
}

export type SaveTarget = 'restaurant' | 'list';

export interface Save {
  userId: ID;
  targetType: SaveTarget;
  targetId: ID;
}

export type ActivityType = 'rated' | 'visited' | 'reviewed' | 'list_added' | 'list_created';

export interface Activity {
  id: ID;
  userId: ID;
  type: ActivityType;
  restaurantId?: ID;
  reviewId?: ID;
  listId?: ID;
  createdAt: string;
}
