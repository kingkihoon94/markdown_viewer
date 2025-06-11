import { create } from 'zustand';

type MarkdownFile = {
  id: string;
  name: string;
  content: string;
};

type State = {
  files: MarkdownFile[];
  addFile: (file: MarkdownFile) => void;
};

export const useMarkdownStore = create<State>((set) => ({
  files: [],
  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),
}));