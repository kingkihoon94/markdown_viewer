import { create } from 'zustand';

import { SortBy } from '../constants/constants';

import type { MarkdownFile } from '../types/types';

type State = {
  files: MarkdownFile[];
  selectedFile: MarkdownFile | null;
  sortBy: SortBy;
  setFiles: (files: MarkdownFile[]) => void;
  setSortBy: (sortBy: SortBy) => void;
  addFile: (file: MarkdownFile) => void;
  selectFile: (file: MarkdownFile) => void;
  deleteFile: (id: string) => void;
  updateFile: (updated: MarkdownFile, prevId: string) => void;
  clearSelection: () => void;
};

export const useMarkdownStore = create<State>((set, get) => ({
  files: [],
  selectedFile: null,
  sortBy: SortBy.TIME,
  setFiles: (files) => set({ files }),
  setSortBy: (sortBy) => set({ sortBy }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  selectFile: (file) => set({ selectedFile: file }),
  deleteFile: (id: string) => {
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
      selectedFile:
        state.selectedFile?.id === id ? null : state.selectedFile,
    }));
  },
  updateFile: (updated, prevId) => {
    set((state) => ({
      files: state.files.map((file) => file.id === prevId ? updated : file),
    }));
  },
  clearSelection: () => set({ selectedFile: null }),
}));

