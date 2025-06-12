import { create } from 'zustand';

import { SortBy } from '../constants/constants';

import type { MarkdownFile } from '../types/types';

type State = {
  files: MarkdownFile[];
  selectedFile: MarkdownFile | null;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  addFile: (file: MarkdownFile) => void;
  selectFile: (file: MarkdownFile) => void;
  clearSelection: () => void;
};

export const useMarkdownStore = create<State>((set) => ({
  files: [],
  selectedFile: null,
  sortBy: SortBy.TIME,
  setSortBy: (sortBy) => set({ sortBy }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  selectFile: (file) => set({ selectedFile: file }),
  clearSelection: () => set({ selectedFile: null }),
}));
