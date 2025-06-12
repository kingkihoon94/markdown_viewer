import { useMarkdownStore } from '../store/useMarkdownStore';

import type { MarkdownFile } from '../types/types';

type Props = {
  file: MarkdownFile;
};

export const MarkdownCard = ({ file }: Props) => {
  const selectFile = useMarkdownStore((state) => state.selectFile);

  return (
    <div className="border rounded-lg p-4 shadow bg-white w-full max-w-md">
      <h3 className="text-lg font-bold mb-2">{file.name}</h3>
      <div className="text-sm text-gray-700 line-clamp-6 mb-3">
        {file.content.slice(0, 300)}...
      </div>
      <button
        className="text-blue-600 hover:underline text-sm"
        onClick={() => selectFile(file)}
      >
        전체 보기 →
      </button>
    </div>
  );
};
