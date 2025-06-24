import { useMutation, useQueryClient } from '@tanstack/react-query';

const uploadMarkdown = async (data: { title: string; content: string }) => {
  const res = await fetch('/api/markdowns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('업로드 실패');
  return res.json();
};

export const useUploadMarkdown = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadMarkdown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markdowns'] });
    },
  });
};
