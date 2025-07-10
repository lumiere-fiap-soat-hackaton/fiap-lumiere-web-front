import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services';

type TPayload = {
  fileName: string;
  fileType: string;
}[];

type TResult = {
  fileName: string;
  presignedUrl: string;
}[];

type UseStorageUrlOptions = {
  resource: 'upload-url' | 'download-url';
};

export const useStorageUrl = ({ resource }: UseStorageUrlOptions) => {
  const client = apiClient();

  return useMutation({
    mutationFn: async (data: TPayload): Promise<TResult> => {
      const response = await client.post(`/api/storage/${resource}`, data);
      return response.data;
    },
  });
};