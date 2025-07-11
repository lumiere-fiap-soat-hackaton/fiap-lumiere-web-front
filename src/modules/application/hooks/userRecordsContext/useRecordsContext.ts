import { createContext, useContext } from 'react';
import type { RecordItem, RecordItemStatus } from '@/modules/application/providers/RecordsProvider.tsx';

interface RecordsContextType {
  files: RecordItem[];
  uploadFiles: (files: File[]) => void;
  updateFileStatus: (id: string, status: RecordItemStatus, progress?: number) => void;
  downloadFile: (id: string) => void;
}

export const RecordsContext = createContext<RecordsContextType | null>(null);

export const useRecordsContext = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};