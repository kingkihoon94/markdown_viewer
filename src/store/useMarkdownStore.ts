import { create } from 'zustand';

type MarkdownFile = {
  id: string;
  name: string;
  content: string;
};

type State = {
  files: MarkdownFile[];
  selectedFile: MarkdownFile | null;
  addFile: (file: MarkdownFile) => void;
  selectFile: (file: MarkdownFile) => void;
  clearSelection: () => void;
};

export const useMarkdownStore = create<State>((set) => ({
  files: [],
  selectedFile: null,
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  selectFile: (file) => set({ selectedFile: file }),
  clearSelection: () => set({ selectedFile: null }),
}));