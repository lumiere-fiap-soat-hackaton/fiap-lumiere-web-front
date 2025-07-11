import React, { type ReactNode, useState } from 'react';
import { RecordsContext } from '../hooks/userRecordsContext';

export type RecordItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface RecordItem {
  id: string;
  filename: string;
  status: RecordItemStatus;
  progress: number;
  uploadedAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
}

interface RecordsProviderProps {
  children: ReactNode;
}

export const RecordsProvider: React.FC<RecordsProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<RecordItem[]>([
    {
      id: '1',
      filename: 'sample-video-1.mp4',
      status: 'COMPLETED',
      progress: 100,
      uploadedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      downloadUrl: '#',
    },
    {
      id: '2',
      filename: 'sample-video-2.mov',
      status: 'COMPLETED',
      progress: 100,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      filename: 'sample-video-3.avi',
      status: 'IN_PROGRESS',
      progress: 89,
      uploadedAt: new Date(Date.now() - 1800000),
    },
    {
      id: '4',
      filename: 'sample-video-1.mp4',
      status: 'IN_PROGRESS',
      progress: 65,
      uploadedAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 82800000),
      downloadUrl: '#',
    },
    {
      id: '5',
      filename: 'sample-video-2.mov',
      status: 'PENDING',
      progress: 0,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '6',
      filename: 'sample-video-3.avi',
      status: 'PENDING',
      progress: 0,
      uploadedAt: new Date(Date.now() - 1800000),
    },
    {
      id: '7',
      filename: 'sample-video-2.mov',
      status: 'FAILED',
      progress: 65,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: '8',
      filename: 'sample-video-3.avi',
      status: 'FAILED',
      progress: 0,
      uploadedAt: new Date(Date.now() - 1800000),
    },
  ]);

  const uploadFiles = (files: File[]) => {
    const newVideos = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      status: 'PENDING' as RecordItemStatus,
      progress: 0,
      uploadedAt: new Date(),
    }));

    setFiles(prev => [...newVideos, ...prev]);

    // Simular processamento
    newVideos.forEach(video => {
      setTimeout(() => {
        updateFileStatus(video.id, 'IN_PROGRESS', 10);

        const interval = setInterval(() => {
          setFiles(prev => prev.map(v => {
            if (v.id === video.id && v.status === 'IN_PROGRESS') {
              const newProgress = Math.min(v.progress + Math.random() * 20, 100);
              if (newProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                  updateFileStatus(video.id, 'COMPLETED', 100);
                }, 500);
                return { ...v, progress: 100, status: 'IN_PROGRESS' as RecordItemStatus };
              }
              return { ...v, progress: newProgress };
            }
            return v;
          }));
        }, 1000);
      }, Math.random() * 2000);
    });
  };

  const updateFileStatus = (id: string, status: RecordItemStatus, progress?: number) => {
    setFiles(prev => prev.map(video => {
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
              detail: { filename: video.filename },
            });
            window.dispatchEvent(event);
          }, 100);
        }

        return updated;
      }
      return video;
    }));
  };

  const downloadFile = (id: string) => {
    const video = files.find(v => v.id === id);
    if (video && video.downloadUrl) {
      window.open(video.downloadUrl, '_blank');
    }
  };

  return (
    <RecordsContext.Provider value={{
      files,
      uploadFiles,
      updateFileStatus,
      downloadFile,
    }}>
      {children}
    </RecordsContext.Provider>
  );
};


