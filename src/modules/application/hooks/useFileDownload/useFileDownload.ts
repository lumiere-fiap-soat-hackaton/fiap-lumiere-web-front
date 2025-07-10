import axios from 'axios';
import { useStorageUrl } from '@/modules/application/hooks';

type TResult = Record<string, unknown>;

export const useFileDownload = () => {
  const { mutateAsync, isPending, isError, isSuccess } = useStorageUrl({
    resource: 'download-url',
  });

  const execute = async (fileKeys: string[]): Promise<Awaited<TResult>[]> => {

    const payload = fileKeys.map(value => ({
      fileName: value,
      fileType: 'application/zip',
    }));

    const result = await mutateAsync(payload);
    console.log('fetchDownloadUrlResult', result);


    return await Promise.all(
      result.map(async ({ fileName, presignedUrl }) => {

        const downloadResult = await axios.get(presignedUrl, {
          responseType: 'stream',
          adapter: 'fetch',
        })
          .then(async (response) => {
            const stream = response.data; // This will be a ReadableStream
            const reader = stream.getReader();

            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                console.log('Stream finished.');
                break;
              }
              // Process the received chunk (value is a Uint8Array)
              console.log('Received chunk:', value);
            }
          })
          .catch(error => {
            console.error('Error fetching stream:', error);
          });

        console.log('downloadResult', presignedUrl);

        return { [fileName]: downloadResult };
      }),
    );
  };

  return { execute, isPending, isError, isSuccess };
};

//window.open(preSignedUrl, '_blank');
