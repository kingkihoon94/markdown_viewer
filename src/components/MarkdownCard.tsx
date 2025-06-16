import { useMarkdownStore } from '../store/useMarkdownStore';
import type { MarkdownFile } from '../types/types';

type Props = {
  file: MarkdownFile;
};

export const MarkdownCard = ({ file }: Props) => {
  const selectFile = useMarkdownStore((state) => state.selectFile);

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 w-[260px] h-[320px] flex flex-col">
      {/* 제목 */}
      <h3 className="text-base font-semibold mb-2 line-clamp-2 break-words">
        {file.name}
      </h3>

      {/* 내용 */}
      <div className="text-sm text-gray-700 flex-1 overflow-hidden line-clamp-[6]">
        {file.content.trim()
          ? file.content
          : <span className="text-gray-400 italic">내용 없음</span>}
      </div>

      {/* 버튼 */}
      <button
        className="text-blue-600 hover:underline text-sm mt-3 self-start"
        onClick={() => selectFile(file)}
      >
        전체 보기 →
      </button>
    </div>
  );
};
