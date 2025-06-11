import { FileUploader } from './components/FileUploader';
import { useMarkdownStore } from './store/useMarkdownStore';
import { MarkdownCard } from './components/MarkdownCard';

function App() {
  const files = useMarkdownStore((state) => state.files);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10">
      <FileUploader />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <MarkdownCard key={file.id} name={file.name} content={file.content} />
        ))}
      </div>
    </div>
  );
}

export default App;
