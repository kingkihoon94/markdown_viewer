import { useParams, useNavigate } from 'react-router-dom';
import { useMarkdownStore } from '../store/useMarkdownStore';
import { useState } from 'react';
import { useUpdateMarkdown } from '../hooks/useUpdateMarkdown';
import type { MarkdownFile } from '../types/types';

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const file = useMarkdownStore((state) => state.files.find((f) => f.id === id));
  const [title, setTitle] = useState(file?.name || '');
  const [content, setContent] = useState(file?.content || '');
  const updateFile = useMarkdownStore((state) => state.updateFile);
  const selectFile = useMarkdownStore((state) => state.selectFile); 
  const { mutate: updateMarkdown } = useUpdateMarkdown();

  if (!file) return <div>파일을 찾을 수 없습니다.</div>;

  const handleSave = () => {
    const finalTitle = title.endsWith('.md') ? title : `${title}.md`;

    updateMarkdown(
      { id: file.id, title: finalTitle, content },
      {
        onSuccess: (res) => {
          const { id: newId, title: newTitle, content } = res.item;

          const updated: MarkdownFile = {
            id: newId,
            name: newTitle,
            content,
            uploadedAt: file.uploadedAt,
          };

          updateFile(updated, file.id);
          selectFile(updated);
          navigate('/');
        },
        onError: (err) => {
          alert('수정 중 오류가 발생했습니다.');
          console.error(err);
        },
      }
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">마크다운 수정</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="border w-full p-2 mb-4"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        저장
      </button>
    </div>
  );
};

export default EditPage;
