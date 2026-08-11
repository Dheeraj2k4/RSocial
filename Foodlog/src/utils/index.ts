/** Small, dependency-free helpers shared across the app. */

export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}
