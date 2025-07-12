import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services';
import type { TStorageUrlPayload, TStorageUrlResult } from '@/modules/application/types.ts';

type UseStorageUrlOptions = {
  resource: 'upload-url' | 'download-url';
};

export const useStorageUrl = ({ resource }: UseStorageUrlOptions) => {
  const client = apiClient();

  return useMutation({
    mutationFn: async (data: TStorageUrlPayload): Promise<TStorageUrlResult> => {
      const response = await client.post(`/api/v1/storage/${resource}`, data);
      return response.data;
    },
  });
};