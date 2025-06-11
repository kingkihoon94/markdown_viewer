import { useMarkdownStore } from '../store/useMarkdownStore';

type Props = {
  id: string;
  name: string;
  content: string;
};

export const MarkdownCard = ({ id, name, content }: Props) => {
  const selectFile = useMarkdownStore((state) => state.selectFile);

  return (
    <div className="border rounded-lg p-4 shadow bg-white w-full max-w-md">
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <div className="text-sm text-gray-700 line-clamp-6 mb-3">
        {content.slice(0, 300)}...
      </div>
      <button
        className="text-blue-600 hover:underline text-sm"
        onClick={() => selectFile({ id, name, content })}
      >
        전체 보기 →
      </button>
    </div>
  );
};
