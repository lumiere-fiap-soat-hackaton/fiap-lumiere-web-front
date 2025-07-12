export type RecordItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface RecordItem {
  id: string;
  sourceFileKey: string;
  sourceFileName: string;
  resultFileKey: string | null;
  resultFileName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  progress: number;
  status: RecordItemStatus;
}

// APi Contracts
export type TStorageUrlPayload = {
  fileName: string;
  fileType: string;
}[];

export type TStorageUrlResult = {
  fileName: string;
  presignedUrl: string;
}[];

export type TUserRecordsResult = RecordItem[];

export type TBucketResponse = Record<string, string>