import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdownStore } from '../store/useMarkdownStore';

type Props = {
  onClose: () => void;
};

export const MarkdownModal = ({ onClose }: Props) => {
  const { selectedFile } = useMarkdownStore();

  if (!selectedFile) return null;


  console.log(selectedFile.content);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedFile.name}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
            </div>
            <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedFile.content}
                </ReactMarkdown>
            </div>
        </div>
    </div>
  );
};