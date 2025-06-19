import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateMarkdown = async (payload: { id: string; title: string; content: string }) => {
  const res = await fetch(`/api/markdowns/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('수정 실패');
  return res.json();
};

export const useUpdateMarkdown = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMarkdown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markdowns'] });
    },
  });
};
