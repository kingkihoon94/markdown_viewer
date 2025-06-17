import { useQuery } from '@tanstack/react-query';

const fetchMarkdowns = async () => {
  const res = await fetch('/api/markdowns');
  if (!res.ok) throw new Error('불러오기 실패');
  return res.json();
};

export const useMarkdowns = () => {
  return useQuery({
    queryKey: ['markdowns'],
    queryFn: fetchMarkdowns,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
  });
};