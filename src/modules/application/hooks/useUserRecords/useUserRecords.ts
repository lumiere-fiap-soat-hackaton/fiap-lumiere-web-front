import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';
import type { TUserRecordsResult } from '@/modules/application/types.ts';

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
    queryFn: async (): Promise<TUserRecordsResult> => {
      const params = new URLSearchParams();

      if (statuses.length > 0) {
        params.set('statuses', statuses.join(','));
      }

      const response = await client.get(`server/api/v1/storage/user-records`, { params });
      return response.data;
    },
  });
};