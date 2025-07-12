import React, { type ReactNode, useEffect, useState } from 'react';
import { useStorageUrl, useUserRecords } from '@/modules/application/hooks';
import type { RecordItem, RecordItemStatus, TBucketResponse, TStorageUrlPayload } from '@/modules/application/types.ts';
import axios from 'axios';
import { RecordsContext } from '@/modules/application/providers/useRecordsContext.ts';

interface RecordsProviderProps {
  children: ReactNode;
}

/*
    mutateAsync: handleUpload,
    isPending: uploadPending,
    isError: uploadError,
    isSuccess: uploadSucceeded,

    mutateAsync: handleDownload,
    isPending: downloadPending,
    isError: downloadError,
    isSuccess: downloadSucceeded,

    { data, isLoading, error }
 */

export const RecordsProvider: React.FC<RecordsProviderProps> = ({ children }) => {
  const [recordsList, setRecordsList] = useState<RecordItem[]>([]);

  const fetchUserRecordsHook = useUserRecords({ refetchInterval: 0 });
  const fetchUploadUrlHook = useStorageUrl({ resource: 'upload-url' });
  const fetchDownloadHook = useStorageUrl({ resource: 'download-url' });

  const uploadFiles = async (files: File[]): Promise<Awaited<TBucketResponse>[]> => {
    const fileMetadataMap = new Map<string, File>();

    const payload: TStorageUrlPayload = Array.from(files).map((file) => {
      const data = {
        fileName: `${crypto.randomUUID()}-${file.name}`,
        fileType: file.type,
      };

      fileMetadataMap.set(data.fileName, file);
      return data;
    });

    const result = await fetchUploadUrlHook.mutateAsync(payload);
    console.log('fetchUploadUrlResult', result);

    return await Promise.all(
      result.map(async ({ fileName, presignedUrl }) => {
        const file = fileMetadataMap.get(fileName);

        const uploadResult = await axios.put(presignedUrl, file);

        console.log('uploadResult', uploadResult);

        return { [fileName]: uploadResult.data };
      }),
    );
  };

  const downloadFiles = async (fileKeys: string[]): Promise<void[]> => {
    const payload = fileKeys.map(value => ({
      fileName: value,
      fileType: 'application/zip',
    }));

    const result = await fetchDownloadHook.mutateAsync(payload);
    console.log('fetchDownloadUrlResult', result);

    return await Promise.all(
      result.map(async ({ presignedUrl }) => {
        await axios.get(presignedUrl, {
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

        //return { [fileName]: downloadResult };
      }),
    );
  };

  const updateFileStatus = (id: string, status: RecordItemStatus, progress?: number) => {
    setRecordsList(prev => prev.map(video => {
      if (video.id === id) {
        const updated = {
          ...video,
          status,
          ...(progress !== undefined && { progress }),
          ...(status === 'COMPLETED' && { completedAt: new Date(), downloadUrl: '#' }),
        };

        // Trigger notification for completed videos
        if (status === 'COMPLETED' && video.status !== 'COMPLETED') {
          setTimeout(() => {
            const event = new CustomEvent('videoCompleted', {
              detail: { filename: video.sourceFileName },
            });
            window.dispatchEvent(event);
          }, 100);
        }

        return updated;
      }
      return video;
    }));
  };

  useEffect(() => {
    if (!fetchUserRecordsHook.data) return;

    setRecordsList(fetchUserRecordsHook.data);
  }, [fetchUserRecordsHook.data]);

  return (
    <RecordsContext.Provider value={{ recordsList, uploadFiles, downloadFiles, updateFileStatus }}>
      {children}
    </RecordsContext.Provider>
  );
};

/*
* {
      id: '1',
      sourceFileName: 'sample-video-1.mp4',
      status: 'COMPLETED',
      progress: 100,
      uploadedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      downloadUrl: '#',
    },
    {
      id: '2',
      sourceFileName: 'sample-video-2.mov',
      status: 'COMPLETED',
      progress: 100,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      sourceFileName: 'sample-video-3.avi',
      status: 'IN_PROGRESS',
      progress: 89,
      uploadedAt: new Date(Date.now() - 1800000),
    },
    {
      id: '4',
      sourceFileName: 'sample-video-1.mp4',
      status: 'IN_PROGRESS',
      progress: 65,
      uploadedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      downloadUrl: '#',
    },
    {
      id: '5',
      sourceFileName: 'sample-video-2.mov',
      status: 'PENDING',
      progress: 0,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '6',
      sourceFileName: 'sample-video-3.avi',
      status: 'PENDING',
      progress: 0,
      uploadedAt: new Date(Date.now() - 1800000),
    },
    {
      id: '7',
      sourceFileName: 'sample-video-2.mov',
      status: 'FAILED',
      progress: 65,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '8',
      sourceFileName: 'sample-video-3.avi',
      status: 'FAILED',
      progress: 0,
      uploadedAt: new Date(Date.now() - 1800000),
    }
    * */

