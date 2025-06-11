import { FileUploader } from './components/FileUploader';
import { MarkdownCard } from './components/MarkdownCard';
import { MarkdownModal } from './components/MarkdownModal';
import { useMarkdownStore } from './store/useMarkdownStore';

function App() {
  const files = useMarkdownStore((state) => state.files);
  const selected = useMarkdownStore((state) => state.selectedFile);
  const clear = useMarkdownStore((state) => state.clearSelection);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10">
      <FileUploader />

      <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <MarkdownCard
            key={file.id}
            name={file.name}
            content={file.content}
            id={file.id}
          />
        ))}
      </div>

      {selected && <MarkdownModal onClose={clear} />}
    </div>
  );
}

export default App;
