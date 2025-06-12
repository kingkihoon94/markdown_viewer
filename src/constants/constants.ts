export const SortBy = {
  TIME: 'time',
  TITLE: 'title',
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];