import axios from 'axios';
import { useStorageUrl } from '@/modules/application/hooks';

type TResult = Record<string, unknown>;

type FilePayload = {
  fileName: string;
  fileType: string;
};

export const useFileUpload = () => {
  const { mutateAsync, isPending, isError, isSuccess } = useStorageUrl({ resource: 'upload-url' });

  const execute = async (files: FileList): Promise<Awaited<TResult>[]> => {
    const fileMetadataMap = new Map<string, File>();

    const payload: FilePayload[] = Array.from(files).map((file) => {
      const metaData = {
        fileName: `${crypto.randomUUID()}-${file.name}`,
        fileType: file.type,
      };

      fileMetadataMap.set(metaData.fileName, file);
      return metaData;
    });

    const result = await mutateAsync(payload);
    console.log('fetchUploadUrlResult', result);

    return await Promise.all(
      result.map(async ({ fileName, metadata, presignedUrl }) => {
        const file = fileMetadataMap.get(fileName);

        const uploadResult = await axios.put(presignedUrl, file, { headers: metadata });

        console.log('uploadResult', uploadResult);

        return { [fileName]: uploadResult };
      }),
    );
  };

  return { execute, isPending, isError, isSuccess };
};
