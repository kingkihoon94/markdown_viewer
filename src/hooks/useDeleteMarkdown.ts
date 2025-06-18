import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteMarkdown = async (id: string) => {
  const res = await fetch(`/api/markdowns/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('삭제 실패');
  }

  return true;
};

export const useDeleteMarkdown = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMarkdown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markdowns'] });
    },
  });
};
