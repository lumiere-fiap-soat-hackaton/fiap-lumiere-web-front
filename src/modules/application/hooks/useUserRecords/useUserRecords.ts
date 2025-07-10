import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';

type TResult = {
  id: string;
  sourceFileKey: string;
  sourceFileName: string;
  resultFileKey: string | null;
  resultFileName: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string | null;
}[];

type UseUserRecordsOptions = {
  statuses?: Array<'PENDING' | 'COMPLETED' | 'FAILED'>;
  refetchInterval?: number; // in ms
};

export const useUserRecords = ({ statuses = [], refetchInterval }: UseUserRecordsOptions) => {
  const client = apiClient();

  return useQuery({
    queryKey: ['userRecords', statuses],
    enabled: true,
    refetchInterval,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (statuses.length > 0) {
        params.set('statuses', statuses.join(','));
      }

      const response = await client.get<TResult>(`/api/storage/user-records`, { params });
      return response.data;
    },
  });
};