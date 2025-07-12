import { createContext, useContext } from 'react';
import type { RecordItem, RecordItemStatus, TBucketResponse } from '@/modules/application/types.ts';

interface RecordsContextType {
  recordsList: RecordItem[];
  uploadFiles: (files: File[]) => Promise<Awaited<TBucketResponse>[]>;
  downloadFiles: (fileKeys: string[]) => Promise<Awaited<void>[]>;
  updateFileStatus: (id: string, status: RecordItemStatus, progress?: number) => void;
}

export const RecordsContext = createContext<RecordsContextType | null>(null);

export const useRecordsContext = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};