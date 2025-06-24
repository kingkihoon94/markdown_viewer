import { useMemo } from 'react';

import type { MarkdownFile } from '../../types/types';

import { SortBy } from '../../constants/constants';

export const useSortedFiles = (files: MarkdownFile[], sortBy: SortBy) => {
  return useMemo(() => {
    return [...files].sort((a, b) => {
      return sortBy === SortBy.TIME
        ? a.uploadedAt - b.uploadedAt
        : a.name.localeCompare(b.name);
    });
  }, [files, sortBy]);
};
