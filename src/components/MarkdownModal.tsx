import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMarkdownStore } from '../store/useMarkdownStore';
import { useDeleteMarkdown } from '../hooks/queries/useDeleteMarkdown';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose: () => void;
};

export const MarkdownModal = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const { selectedFile, deleteFile } = useMarkdownStore();
  const { mutate: deleteMarkdown } = useDeleteMarkdown();

  if (!selectedFile) return null;

  const handleDelete = () => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    deleteMarkdown(selectedFile.id, {
      onSuccess: () => {
        deleteFile(selectedFile.id);
        onClose();
      },
      onError: (err) => {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(err);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white max-w-[80vw] max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{selectedFile.name}</h2>
          <div className="flex gap-2 items-center">
            <button className="text-sm text-blue-500 hover:underline leading-none" onClick={() => {navigate(`/edit/${selectedFile.id}`);}}>수정</button>
            <button className="text-sm text-red-500 hover:underline leading-none" onClick={handleDelete}>삭제</button>
          </div>
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
