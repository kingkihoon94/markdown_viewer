import { useEffect } from 'react';

import { FileUploader } from '../components/FileUploader';
import { MarkdownModal } from '../components/MarkdownModal';
import { MarkdownCarousel } from '../components/MarkdownCarousel';

import { useMarkdownStore } from '../store/useMarkdownStore';

import { useMarkdowns } from '../hooks/queries/useMarkdown';
import { useSortedFiles } from '../hooks/ui/useSortedFiles';

function HomePage() {
  const files = useMarkdownStore((state) => state.files);
  const selected = useMarkdownStore((state) => state.selectedFile);
  const clear = useMarkdownStore((state) => state.clearSelection);
  const sortBy = useMarkdownStore((state) => state.sortBy);
  const setSortBy = useMarkdownStore((state) => state.setSortBy);
  const setFiles = useMarkdownStore((state) => state.setFiles);

  const { data, isSuccess } = useMarkdowns();

  useEffect(() => {
    if (isSuccess) {
      const loaded = data.map((item: { id: string; title: string; content: string; uploadedAt: number }) => ({
        id: item.id,
        name: item.title,
        content: item.content,
        uploadedAt: item.uploadedAt,
      }));
      setFiles(loaded);
    }
  }, [isSuccess, data, setFiles]);

  const sortedFiles = useSortedFiles(files, sortBy);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10">
      <FileUploader />
      <div className="mt-6 mb-4 flex gap-2">
        <button
          onClick={() => setSortBy('time')}
          className={`px-4 py-2 rounded border ${
            sortBy === 'time' ? 'bg-blue-100 text-blue-800' : 'bg-white'
          }`}
        >
          🕒 시간순
        </button>
        <button
          onClick={() => setSortBy('title')}
          className={`px-4 py-2 rounded border ${
            sortBy === 'title' ? 'bg-blue-100 text-blue-800' : 'bg-white'
          }`}
        >
          🔤 제목순
        </button>
      </div>
      <MarkdownCarousel files={sortedFiles} focusId={selected?.id} />
      {selected && <MarkdownModal onClose={clear} />}
    </div>
  );
}

export default HomePage;
